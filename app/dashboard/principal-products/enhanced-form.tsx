'use client';

import Image from 'next/image';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState, useCallback } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
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
        return {
          ...product,
          slug: productSlug,
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
              <FormField
                control={form.control}
                name="imagePath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
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
                              alt="Company logo preview"
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <span className="text-sm text-muted-foreground">
                              Current logo
                            </span>
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Principal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin Principal title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
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

                      {/* User Products Section */}
                      <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-semibold">User Products</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const currentUserProducts = form.getValues(`products.${index}.userProducts`) || [];
                              form.setValue(`products.${index}.userProducts`, [
                                ...currentUserProducts,
                                {
                                  slug: '',
                                  title: '',
                                  subtitle: '',
                                  productFamily: '',
                                  components: '',
                                  keyTechnicalSpecifications: '',
                                  applicationsTargetMarkets: '',
                                  technicalHighlights: '',
                                  typicalApplications: '',
                                  targetMarketsEndUsers: '',
                                  keyDifferentiatorsPositioning: '',
                                }
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
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`products.${index}.userProducts.${userProductIndex}.title`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Title (Optional)</FormLabel>
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
                                      <FormLabel>Subtitle (Optional)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="User product subtitle" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.slug`}
                                render={({ field }) => {
                                  console.log(`🔍 Rendering User Product Slug Field [${index}][${userProductIndex}]:`, field.value);
                                  
                                  return (
                                    <FormItem>
                                      <FormLabel>User Product Slug (Auto-generated)</FormLabel>
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
                                            💡 Generated from: "{form.watch(`products.${index}.userProducts.${userProductIndex}.title`) || 'Enter title above'}"
                                          </div>
                                        </div>
                                      </FormControl>
                                      <p className="text-xs text-muted-foreground">
                                        Automatically generated from the user product title
                                      </p>
                                      <FormMessage />
                                    </FormItem>
                                  );
                                }}
                              />

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
                                name={`products.${index}.userProducts.${userProductIndex}.keyFeatures`}
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
                                          Enter each key feature on a new line.
                                        </p>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.productFamily`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Product Family (Optional)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Product family" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.components`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Components (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Components description"
                                        className="min-h-[80px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.keyTechnicalSpecifications`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Key Technical Specifications (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Key technical specifications"
                                        className="min-h-[80px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.applicationsTargetMarkets`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Applications & Target Markets (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Applications and target markets"
                                        className="min-h-[80px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.technicalHighlights`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Technical Highlights (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Technical highlights"
                                        className="min-h-[80px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.typicalApplications`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Typical Applications (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Typical applications"
                                        className="min-h-[80px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.targetMarketsEndUsers`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Target Markets / End Users (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Target markets and end users"
                                        className="min-h-[80px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`products.${index}.userProducts.${userProductIndex}.keyDifferentiatorsPositioning`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Key Differentiators & Positioning (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Key differentiators and positioning"
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
