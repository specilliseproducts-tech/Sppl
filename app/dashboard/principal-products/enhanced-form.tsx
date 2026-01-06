'use client';

import Image from 'next/image';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState, useCallback } from 'react';
import { Plus, X, Trash2, Columns } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MediaUploader } from '@/components/media-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { principalProductInsertSchema, productSchema, userProductSchema } from './schema';
import { generateSlug } from '@/lib/utils/slug';
import { ProductCards } from './product-cards';
import { JSX } from 'react';

interface Props {
  data?: z.infer<typeof principalProductInsertSchema>;
  submitAction: JSX.Element;
  onSubmit(values: z.infer<typeof principalProductInsertSchema>): void;
}

export function EnhancedPrincipalProductForm(props: Props) {
  const [showProductForm, setShowProductForm] = useState(false);
  
  const form = useForm<z.infer<typeof principalProductInsertSchema>>({
    resolver: zodResolver(principalProductInsertSchema),
    defaultValues: {
      slug: '',
      title: '',
      description: '',
      imagePath: '',
      link: '',
      keyFacts: [],
      productRangeOverview: {
        headers: [],
        rows: [],
      },
      products: [],
      ...props.data,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });

  // Watch title changes to auto-generate slug
  const titleValue = form.watch('title');
  const productsValue = form.watch('products');

  // Ensure customSections are initialized for all products when data is loaded
  useEffect(() => {
    if (props.data?.products && Array.isArray(props.data.products)) {
      const productsWithCustomSections = props.data.products.map((product: any) => ({
        ...product,
        customSections: (product.customSections || []).map((section: any) => {
          // Migrate old format (description) to new format (descriptions array)
          if (section.description && !section.descriptions) {
            return {
              ...section,
              descriptions: [section.description],
            };
          }
          // Ensure descriptions array exists
          return {
            ...section,
            descriptions: section.descriptions || [],
          };
        }),
      }));
      form.setValue('products', productsWithCustomSections, { shouldDirty: false });
    }
  }, [props.data?.products, form]);

  // Generate principal slug
  useEffect(() => {
    if (titleValue && titleValue.trim() && !props.data?.slug) {
      const slug = generateSlug(titleValue);
      form.setValue('slug', slug);
    }
  }, [titleValue, props.data?.slug, form]);

  // Generate master product slugs
  useEffect(() => {
    if (!productsValue || !Array.isArray(productsValue)) return;
    
    productsValue.forEach((product, productIndex) => {
      if (product.title && product.title.trim()) {
        const masterSlug = generateSlug(product.title);
        const currentSlug = form.getValues(`products.${productIndex}.slug`);
        
        console.log(`🔍 Master Product Check [${productIndex}]:`, {
          title: product.title,
          generatedSlug: masterSlug,
          currentSlug: currentSlug,
          willUpdate: currentSlug !== masterSlug,
        });
        
        if (currentSlug !== masterSlug) {
          console.log(`✅ Setting master slug: "${masterSlug}" ← "${product.title}"`);
          form.setValue(`products.${productIndex}.slug`, masterSlug, { shouldValidate: false, shouldDirty: true });
        }
      }
    });
  }, [productsValue]);

  // Generate user product slugs
  useEffect(() => {
    if (!productsValue || !Array.isArray(productsValue)) return;
    
    productsValue.forEach((product, productIndex) => {
      if (!product.userProducts || !Array.isArray(product.userProducts)) return;
      
      product.userProducts.forEach((userProduct, userProductIndex) => {
        if (userProduct.title && userProduct.title.trim()) {
          const userSlug = generateSlug(userProduct.title);
          const currentSlug = form.getValues(
            `products.${productIndex}.userProducts.${userProductIndex}.slug`
          );
          
          console.log(`🔍 User Product Check [${productIndex}][${userProductIndex}]:`, {
            title: userProduct.title,
            generatedSlug: userSlug,
            currentSlug: currentSlug,
            willUpdate: currentSlug !== userSlug,
          });
          
          if (currentSlug !== userSlug) {
            console.log(`✅ Setting user product slug: "${userSlug}" ← "${userProduct.title}"`);
            form.setValue(
              `products.${productIndex}.userProducts.${userProductIndex}.slug`,
              userSlug,
              { shouldValidate: false, shouldDirty: true }
            );
          }
        }
      });
    });
  }, [productsValue]);

  const addProduct = () => {
    const newProduct = {
      slug: '',
      title: '',
      subtitle: '',
      images: [],
      keyFeatures: [],
      keyTechnicalSpecifications: '',
      typicalApplications: '',
      customSections: [],
      primaryApplicationDomains: [],
      userProducts: [],
    };
    append(newProduct);
    setShowProductForm(true);
  };

  const removeProduct = (index: number) => {
    remove(index);
  };

  // Handle form submission
  const handleFormSubmit = (data: z.infer<typeof principalProductInsertSchema>) => {
    // Ensure all slugs are generated before submission
    if (data.products && Array.isArray(data.products)) {
      data.products = data.products.map((product, idx) => {
        const productSlug = product.slug || generateSlug(product.title || `product-${idx}`);
        
        // Filter out empty custom sections and empty descriptions
        const validCustomSections = (product.customSections || [])
          .map((section: any) => {
            // Filter out empty descriptions within each section
            const validDescriptions = (section.descriptions || []).filter(
              (desc: string) => desc && desc.trim()
            );
            return {
              ...section,
              descriptions: validDescriptions,
            };
          })
          .filter(
            (section: any) => 
              section.title && 
              section.title.trim() && 
              section.descriptions && 
              section.descriptions.length > 0
          );
        
        return {
          ...product,
          slug: productSlug,
          // Ensure customSections is preserved and filtered
          customSections: validCustomSections,
          userProducts: product.userProducts?.map((userProduct, uIdx) => {
            const userSlug = userProduct.slug || generateSlug(userProduct.title || `user-product-${uIdx}`);
            return {
              ...userProduct,
              slug: userSlug,
            };
          }) || [],
        };
      });
    }

    // Ensure principal slug is set
    if (!data.slug && data.title) {
      data.slug = generateSlug(data.title);
    }

    console.log('🔍 Final data before submission:', {
      title: data.title,
      slug: data.slug,
      products: data.products?.map(p => ({
        title: p.title,
        slug: p.slug,
        customSections: p.customSections,
        userProducts: p.userProducts?.map(up => ({
          title: up.title,
          slug: up.slug,
        })),
      })),
    });

    props.onSubmit(data);
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Principal Product Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Principal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin Principal title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Admin Principal description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload Photo */}
              <FormField
                control={form.control}
                name="imagePath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Photo</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <MediaUploader
                          onUpload={(urls) => {
                            if (urls.length > 0) {
                              field.onChange(urls[0]);
                            }
                          }}
                          multiple={false}
                        />
                        {field.value && (
                          <div className="flex items-center space-x-2">
                            <Image
                              src={field.value}
                              alt="Photo preview"
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded border-2 border-secondary/30"
                            />
                            <span className="text-sm text-muted-foreground">
                              Current photo
                            </span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Key Facts - Optional with + button */}
              <FormField
                control={form.control}
                name="keyFacts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Facts (Optional)</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        {field.value && field.value.length > 0 && (
                          <div className="space-y-2">
                            {field.value.map((fact, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  placeholder={`Key fact ${index + 1}`}
                                  value={fact}
                                  onChange={(e) => {
                                    const newFacts = [...field.value];
                                    newFacts[index] = e.target.value;
                                    field.onChange(newFacts);
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newFacts = field.value.filter((_, i) => i !== index);
                                    field.onChange(newFacts);
                                  }}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            field.onChange([...(field.value || []), '']);
                          }}
                          className="w-full"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Key Fact
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Range Overview - Table */}
              <FormField
                control={form.control}
                name="productRangeOverview"
                render={({ field }) => {
                  const tableData = field.value || { headers: [], rows: [] };
                  
                  const addColumn = () => {
                    const newHeaders = [...(tableData.headers || []), ''];
                    const newRows = (tableData.rows || []).map(row => [...row, '']);
                    field.onChange({ headers: newHeaders, rows: newRows });
                  };

                  const removeColumn = (colIndex: number) => {
                    const newHeaders = tableData.headers.filter((_, i) => i !== colIndex);
                    const newRows = (tableData.rows || []).map(row => row.filter((_, i) => i !== colIndex));
                    field.onChange({ headers: newHeaders, rows: newRows });
                  };

                  const updateHeader = (colIndex: number, value: string) => {
                    const newHeaders = [...(tableData.headers || [])];
                    newHeaders[colIndex] = value;
                    field.onChange({ ...tableData, headers: newHeaders });
                  };

                  const addRow = () => {
                    const columnCount = (tableData.headers || []).length || 1;
                    const newRow = Array(columnCount).fill('');
                    field.onChange({
                      ...tableData,
                      rows: [...(tableData.rows || []), newRow],
                    });
                  };

                  const removeRow = (rowIndex: number) => {
                    const newRows = (tableData.rows || []).filter((_, i) => i !== rowIndex);
                    field.onChange({ ...tableData, rows: newRows });
                  };

                  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
                    const newRows = [...(tableData.rows || [])];
                    if (!newRows[rowIndex]) {
                      newRows[rowIndex] = Array((tableData.headers || []).length).fill('');
                    }
                    newRows[rowIndex][colIndex] = value;
                    field.onChange({ ...tableData, rows: newRows });
                  };

                  return (
                    <FormItem>
                      <FormLabel>Product Range Overview (Optional)</FormLabel>
                      <FormControl>
                        <div className="space-y-4 border-2 border-secondary/30 rounded-lg p-4">
                          {/* Table Controls */}
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addColumn}
                            >
                              <Columns className="mr-2 h-4 w-4" />
                              Add Column
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addRow}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Row
                            </Button>
                          </div>

                          {/* Table */}
                          {(tableData.headers && tableData.headers.length > 0) || 
                           (tableData.rows && tableData.rows.length > 0) ? (
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse border border-secondary/30">
                                <thead>
                                  <tr>
                                    {(tableData.headers || []).map((header, colIndex) => (
                                      <th key={colIndex} className="border border-secondary/30 p-2 bg-card">
                                        <div className="flex items-center gap-2">
                                          <Input
                                            placeholder={`Column ${colIndex + 1}`}
                                            value={header}
                                            onChange={(e) => updateHeader(colIndex, e.target.value)}
                                            className="border-secondary/50"
                                          />
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeColumn(colIndex)}
                                            className="text-destructive hover:text-destructive h-6 w-6 p-0"
                                          >
                                            <X className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {(tableData.rows || []).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      {(tableData.headers || ['']).map((_, colIndex) => (
                                        <td key={colIndex} className="border border-secondary/30 p-2">
                                          <div className="space-y-1">
                                            <Textarea
                                              placeholder={`Enter content...\nFor bullet points, enter one per line:\n• Item 1\n• Item 2`}
                                              value={row[colIndex] || ''}
                                              onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                              className="border-secondary/50 min-h-[100px] text-sm"
                                              rows={4}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                              💡 Tip: Enter one bullet point per line. Use "•" or "-" for bullets.
                                            </p>
                                          </div>
                                        </td>
                                      ))}
                                      <td className="border border-secondary/30 p-2">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeRow(rowIndex)}
                                          className="text-destructive hover:text-destructive"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-secondary/30 rounded">
                              <p>No table data yet. Click "Add Column" to start building your table.</p>
                            </div>
                          )}

                          {/* Preview Section */}
                          {(tableData.headers && tableData.headers.length > 0) && 
                           (tableData.rows && tableData.rows.length > 0) && (
                            <div className="mt-6 border-2 border-secondary/30 rounded-lg p-4 bg-muted/30">
                              <h4 className="text-sm font-semibold text-secondary mb-3">Preview</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-secondary/20 bg-background text-sm">
                                  <thead>
                                    <tr>
                                      {tableData.headers.map((header, colIndex) => (
                                        <th
                                          key={colIndex}
                                          className="px-3 py-2 border border-secondary/20 text-left font-semibold text-secondary bg-secondary/10"
                                        >
                                          {header || `Column ${colIndex + 1}`}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tableData.rows.map((row, rowIndex) => (
                                      <tr
                                        key={rowIndex}
                                        className={rowIndex % 2 === 0 ? 'bg-card' : 'bg-background'}
                                      >
                                        {(tableData.headers || ['']).map((_, colIndex) => {
                                          const cellContent = row[colIndex] || '';
                                          const hasNewlines = cellContent.includes('\n');
                                          
                                          return (
                                            <td
                                              key={colIndex}
                                              className="px-3 py-2 border border-secondary/10 text-foreground"
                                            >
                                              {hasNewlines ? (
                                                <ul className="list-none space-y-1">
                                                  {cellContent
                                                    .split('\n')
                                                    .filter(line => line.trim())
                                                    .map((line, lineIdx) => {
                                                      const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
                                                      return (
                                                        <li key={lineIdx} className="flex items-start">
                                                          <span className="text-secondary mr-2">•</span>
                                                          <span>{cleanLine}</span>
                                                        </li>
                                                      );
                                                    })}
                                                </ul>
                                              ) : (
                                                <span>{cellContent || '-'}</span>
                                              )}
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Slug (Auto-generated) */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (Auto-generated from title)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="principal-product-slug"
                        disabled
                        className="bg-muted"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Link (Optional) */}
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Add Master Product Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={addProduct}
              variant="outline"
              className="group"
            >
              <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
              Add Master Product
            </Button>
          </div>

          {/* Master Products Section */}
          {fields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Master Products ({fields.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {fields.map((field, index) => (
                  <Card key={field.id} className="border-dashed">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Master Product {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`products.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Master Product Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Master Product title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`products.${index}.subtitle`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Master Product Subtitle (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Master Product subtitle (optional)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`products.${index}.slug`}
                        render={({ field }) => {
                          console.log(`🔍 Rendering Master Slug Field [${index}]:`, field.value);
                          
                          return (
                            <FormItem>
                              <FormLabel>Master Product Slug (Auto-generated)</FormLabel>
                              <FormControl>
                                <div className="space-y-2">
                                  {field.value ? (
                                    <div className="flex items-center gap-2">
                                      <div className="flex-1 px-3 py-2 bg-gray-800 border border-orange-500 rounded-md text-orange-500 font-mono text-sm font-bold">
                                        {field.value}
                                      </div>
                                      <span className="text-lg text-green-500 font-bold">✓</span>
                                    </div>
                                  ) : (
                                    <Input 
                                      placeholder="Slug will appear here after entering title..." 
                                      value=""
                                      readOnly 
                                      className="bg-gray-800 border-gray-700 text-gray-500"
                                      disabled
                                    />
                                  )}
                                  <div className="text-xs text-gray-400">
                                    💡 Generated from: "{form.watch(`products.${index}.title`) || 'Enter title above'}"
                                  </div>
                                </div>
                              </FormControl>
                              <p className="text-xs text-muted-foreground">
                                Automatically generated from the master product title
                              </p>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                        <FormField
                          control={form.control}
                          name={`products.${index}.images`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Master Product Images (Max 2)</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <MediaUploader
                                  onUpload={(urls) => {
                                    const currentImages = field.value || [];
                                    const newImages = [...currentImages, ...urls].slice(0, 2);
                                    field.onChange(newImages);
                                  }}
                                  multiple={true}
                                />
                                {field.value && field.value.length > 0 && (
                                  <div className="flex gap-4 flex-wrap">
                                    {field.value.map((image, imgIndex) => (
                                      <div key={imgIndex} className="relative group">
                                        <Image
                                          src={image}
                                          alt={`Product image ${imgIndex + 1}`}
                                          width={120}
                                          height={120}
                                          className="w-30 h-30 object-cover rounded border"
                                        />
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          size="sm"
                                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                          onClick={() => {
                                            const newImages = field.value.filter((_, i) => i !== imgIndex);
                                            field.onChange(newImages);
                                          }}
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`products.${index}.keyFeatures`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Features (Optional)</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Textarea
                                  placeholder="Enter key features, one per line"
                                  className="min-h-[80px]"
                                  value={field.value ? field.value.join('\n') : ''}
                                  onChange={(e) => {
                                    const features = e.target.value.split('\n').filter(f => f.trim());
                                    field.onChange(features);
                                  }}
                                />
                                <p className="text-xs text-muted-foreground">
                                  Enter each key feature on a new line. Leave empty to use default features.
                                </p>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Specification Table */}
                      <FormField
                        control={form.control}
                        name={`products.${index}.keyTechnicalSpecifications`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specification Table (Optional)</FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                <Textarea
                                  placeholder='Enter rows like "Wavelength Options: 266 nm (UV), 355 nm (UV) …" – one per line'
                                  className="min-h-[100px]"
                                  {...field}
                                />
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const current = field.value || '';
                                      const prefix = current && !current.endsWith('\n') ? '\n' : '';
                                      const template =
                                        'Wavelength Options: 266 nm (UV), 355 nm (UV), 532 nm (Green), 1064 nm (IR)';
                                      field.onChange(current + prefix + template);
                                    }}
                                  >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Row
                                  </Button>
                                </div>
                              </div>
                            </FormControl>
                            {/* Preview Table */}
                            {field.value && field.value.trim() && (
                              <div className="mt-4">
                                <p className="text-xs text-muted-foreground mb-2">
                                  Preview:
                                </p>
                                <div className="overflow-x-auto rounded-lg border border-secondary/30">
                                  <table className="w-full border-collapse">
                                    <tbody>
                                      {field.value
                                        .split('\n')
                                        .map((line) => line.trim())
                                        .filter(Boolean)
                                        .map((line, idx) => {
                                          const [label, ...rest] = line.split(':');
                                          const value = rest.join(':').trim();
                                          return (
                                            <tr
                                              key={idx}
                                              className={
                                                idx % 2 === 0 ? 'bg-background' : 'bg-muted/40'
                                              }
                                            >
                                              <td className="w-1/3 px-3 py-2 border-b border-secondary/20 text-sm font-medium text-foreground">
                                                {label || '-'}
                                              </td>
                                              <td className="px-3 py-2 border-b border-secondary/20 text-sm text-muted-foreground">
                                                {value || ''}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Applications */}
                      <FormField
                        control={form.control}
                        name={`products.${index}.typicalApplications`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Applications (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter applications, one per line"
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Custom Sections */}
                      <FormField
                        control={form.control}
                        name={`products.${index}.customSections`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Custom Sections (Optional)</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                {field.value && field.value.length > 0 && (
                                  <div className="space-y-4">
                                    {field.value.map((section, sectionIndex) => (
                                      <Card key={sectionIndex} className="border-dashed">
                                        <CardHeader className="pb-3">
                                          <div className="flex justify-between items-center">
                                            <CardTitle className="text-sm">
                                              Custom Section {sectionIndex + 1}
                                            </CardTitle>
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                const newSections = field.value.filter(
                                                  (_, i) => i !== sectionIndex
                                                );
                                                field.onChange(newSections);
                                              }}
                                              className="text-destructive hover:text-destructive"
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <Input
                                            placeholder="Section Title"
                                            value={section.title || ''}
                                            onChange={(e) => {
                                              const newSections = [...field.value];
                                              newSections[sectionIndex] = {
                                                ...newSections[sectionIndex],
                                                title: e.target.value,
                                              };
                                              field.onChange(newSections);
                                            }}
                                          />
                                          
                                          {/* Multiple Descriptions */}
                                          <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                              <label className="text-sm font-medium">Descriptions</label>
                                              <span className="text-xs text-muted-foreground">
                                                Use <strong>**text**</strong> for bold formatting
                                              </span>
                                            </div>
                                            {(section.descriptions || []).map((desc: string, descIndex: number) => (
                                              <div key={descIndex} className="flex items-start gap-2">
                                                <div className="flex-1 space-y-1">
                                                  <Textarea
                                                    placeholder={`Description ${descIndex + 1}`}
                                                    className="min-h-[80px] w-full"
                                                    value={desc}
                                                    onChange={(e) => {
                                                      const newSections = [...field.value];
                                                      const newDescriptions = [...(newSections[sectionIndex].descriptions || [])];
                                                      newDescriptions[descIndex] = e.target.value;
                                                      newSections[sectionIndex] = {
                                                        ...newSections[sectionIndex],
                                                        descriptions: newDescriptions,
                                                      };
                                                      field.onChange(newSections);
                                                    }}
                                                  />
                                                  {/* Preview of bold text */}
                                                  {desc && desc.includes('**') && (
                                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded border border-secondary/20">
                                                      <span className="font-semibold">Preview: </span>
                                                      <span dangerouslySetInnerHTML={{
                                                        __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                      }} />
                                                    </div>
                                                  )}
                                                </div>
                                                <Button
                                                  type="button"
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => {
                                                    const newSections = [...field.value];
                                                    const newDescriptions = (newSections[sectionIndex].descriptions || []).filter(
                                                      (_, i) => i !== descIndex
                                                    );
                                                    newSections[sectionIndex] = {
                                                      ...newSections[sectionIndex],
                                                      descriptions: newDescriptions,
                                                    };
                                                    field.onChange(newSections);
                                                  }}
                                                  className="text-destructive hover:text-destructive mt-2"
                                                >
                                                  <X className="h-4 w-4" />
                                                </Button>
                                              </div>
                                            ))}
                                            <Button
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={() => {
                                                const newSections = [...field.value];
                                                const currentDescriptions = newSections[sectionIndex].descriptions || [];
                                                newSections[sectionIndex] = {
                                                  ...newSections[sectionIndex],
                                                  descriptions: [...currentDescriptions, ''],
                                                };
                                                field.onChange(newSections);
                                              }}
                                              className="w-full"
                                            >
                                              <Plus className="mr-2 h-4 w-4" />
                                              Add Description
                                            </Button>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                )}
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    field.onChange([
                                      ...(field.value || []),
                                      { title: '', descriptions: [''] },
                                    ]);
                                  }}
                                  className="w-full"
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Add Custom Section
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Primary Application Domains */}
                      <FormField
                        control={form.control}
                        name={`products.${index}.primaryApplicationDomains`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Application Domains (Optional)</FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                {field.value && field.value.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {field.value.map((domain: string, domainIndex: number) => (
                                      <div
                                        key={domainIndex}
                                        className="flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full border border-secondary/30"
                                      >
                                        <span className="text-sm font-medium">{domain}</span>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            const newDomains = field.value.filter(
                                              (_, i) => i !== domainIndex
                                            );
                                            field.onChange(newDomains);
                                          }}
                                          className="h-5 w-5 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Enter application domain (e.g., Microfluidics)"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const input = e.currentTarget;
                                        const value = input.value.trim();
                                        if (value) {
                                          field.onChange([...(field.value || []), value]);
                                          input.value = '';
                                        }
                                      }
                                    }}
                                    className="flex-1"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                      const value = input?.value.trim();
                                      if (value) {
                                        field.onChange([...(field.value || []), value]);
                                        input.value = '';
                                      }
                                    }}
                                  >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Domain
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Add application domains that this master product serves. Press Enter or click "Add Domain" to add.
                                </p>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* User Products Section */}
                      <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-semibold">User Products</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const currentUserProducts =
                                form.getValues(`products.${index}.userProducts`) || [];
                              form.setValue(`products.${index}.userProducts`, [
                                ...currentUserProducts,
                                {
                                  slug: '',
                                  title: '',
                                  subtitle: '',
                                  images: [],
                                  keyFeatures: [],
                                  keyTechnicalSpecifications: '',
                                  typicalApplications: '',
                                  productFamily: '',
                                  components: '',
                                  applicationsTargetMarkets: '',
                                  technicalHighlights: '',
                                  targetMarketsEndUsers: '',
                                  keyDifferentiatorsPositioning: '',
                                },
                              ]);
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add User Product
                          </Button>
                        </div>

                        {form.watch(`products.${index}.userProducts`)?.map((_, userProductIndex) => (
                          <Card key={userProductIndex} className="border-dashed mb-4">
                            <CardHeader className="pb-4">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base">User Product {userProductIndex + 1}</CardTitle>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const currentUserProducts = form.getValues(`products.${index}.userProducts`) || [];
                                    const newUserProducts = currentUserProducts.filter((_, i) => i !== userProductIndex);
                                    form.setValue(`products.${index}.userProducts`, newUserProducts);
                                  }}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {/* Title & Subtitle */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`products.${index}.userProducts.${userProductIndex}.title`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Title</FormLabel>
                                      <FormControl>
                                        <Input placeholder="User product title" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`products.${index}.userProducts.${userProductIndex}.subtitle`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Subtitle</FormLabel>
                                      <FormControl>
                                        <Input placeholder="User product subtitle" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              {/* Images */}
                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.images`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>User Product Images (Max 2)</FormLabel>
                                    <FormControl>
                                      <div className="space-y-4">
                                        <MediaUploader
                                          onUpload={(urls) => {
                                            const currentImages = field.value || [];
                                            const newImages = [...currentImages, ...urls].slice(0, 2);
                                            field.onChange(newImages);
                                          }}
                                          multiple={true}
                                        />
                                        {field.value && field.value.length > 0 && (
                                          <div className="flex gap-4 flex-wrap">
                                            {field.value.map((image, imgIndex) => (
                                              <div key={imgIndex} className="relative group">
                                                <Image
                                                  src={image}
                                                  alt={`User product image ${imgIndex + 1}`}
                                                  width={120}
                                                  height={120}
                                                  className="w-30 h-30 object-cover rounded border-2 border-secondary/30"
                                                />
                                                <Button
                                                  type="button"
                                                  variant="destructive"
                                                  size="sm"
                                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                  onClick={() => {
                                                    const newImages = field.value.filter((_, i) => i !== imgIndex);
                                                    field.onChange(newImages);
                                                  }}
                                                >
                                                  <X className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Key Features */}
                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.keyFeatures`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Key Features</FormLabel>
                                    <FormControl>
                                      <div className="space-y-2">
                                        <Textarea
                                          placeholder="Enter key features, one per line"
                                          className="min-h-[80px]"
                                          value={field.value ? field.value.join('\n') : ''}
                                          onChange={(e) => {
                                            const features = e.target.value.split('\n').filter(f => f.trim());
                                            field.onChange(features);
                                          }}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                          Enter each key feature on a new line.
                                        </p>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Specification Table */}
                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.keyTechnicalSpecifications`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Specification Table (Optional)</FormLabel>
                                    <FormControl>
                                      <div className="space-y-3">
                                        <Textarea
                                          placeholder='Enter rows like “Wavelength Options: 266 nm (UV), 355 nm (UV) …” – one per line'
                                          className="min-h-[80px]"
                                          {...field}
                                        />
                                        <div className="flex flex-wrap gap-2">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              const current = field.value || '';
                                              const prefix = current && !current.endsWith('\n') ? '\n' : '';
                                              const template =
                                                'Wavelength Options: 266 nm (UV), 355 nm (UV), 532 nm (Green), 1064 nm (IR)';
                                              field.onChange(current + prefix + template);
                                            }}
                                          >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Row
                                          </Button>
                                        </div>
                                      </div>
                                    </FormControl>
                                    {/* Preview Table */}
                                    {field.value && field.value.trim() && (
                                      <div className="mt-4">
                                        <p className="text-xs text-muted-foreground mb-2">
                                          Preview:
                                        </p>
                                        <div className="overflow-x-auto rounded-lg border border-secondary/30">
                                          <table className="w-full border-collapse">
                                            <tbody>
                                              {field.value
                                                .split('\n')
                                                .map((line) => line.trim())
                                                .filter(Boolean)
                                                .map((line, idx) => {
                                                  const [label, ...rest] = line.split(':');
                                                  const value = rest.join(':').trim();
                                                  return (
                                                    <tr
                                                      key={idx}
                                                      className={
                                                        idx % 2 === 0 ? 'bg-background' : 'bg-muted/40'
                                                      }
                                                    >
                                                      <td className="w-1/3 px-3 py-2 border-b border-secondary/20 text-sm font-medium text-foreground">
                                                        {label || '-'}
                                                      </td>
                                                      <td className="px-3 py-2 border-b border-secondary/20 text-sm text-muted-foreground">
                                                        {value || ''}
                                                      </td>
                                                    </tr>
                                                  );
                                                })}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    )}
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.typicalApplications`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Applications (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Enter applications, one per line"
                                        className="min-h-[80px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          {props.submitAction}
        </form>
      </Form>

      {/* Show Product Cards */}
      {fields.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Master Products Created Successfully!
            </h3>
            <p className="text-green-700 text-sm">
              You have created {fields.length} master product{fields.length > 1 ? 's' : ''}. 
              These will be displayed under the Admin Principal.
            </p>
          </div>
          <ProductCards 
            products={fields.map(field => ({
              id: field.id,
              title: field.title,
              subtitle: field.subtitle,
              images: field.images,
              keyFeatures: field.keyFeatures,
              userProducts: field.userProducts
            }))}
            principalProductSlug={form.watch('slug') || 'preview'}
          />
        </div>
      )}
    </div>
  );
}
