import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { PaginationParams } from '@/lib/apiClient';
import { toast } from '@/hooks/use-toast';
import { ProductInsert } from '@/app/dashboard/products/schema';
import { SolutionInsert } from '@/app/dashboard/solutions/schema';
import { PrincipalProductInsert } from '@/app/dashboard/principal-products/schema';
import { z } from 'zod';

// Account hooks
export function useAccounts(
  params?: PaginationParams & { companyId?: string },
) {
  return useQuery({
    queryKey: ['accounts', params],
    queryFn: () => apiClient.getAccounts(params),
    select: (data) => {
      console.log('useAccounts - Raw data:', data);
      if (data.success && data.data) {
        return data.data;
      }
      return null;
    },
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      parentId?: string;
      isGroup: boolean;
      companyId: string;
    }) => apiClient.createAccount(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        toast({
          title: 'Success',
          description: 'Account created successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create account',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        parentId?: string;
        isGroup: boolean;
        companyId: string;
      };
    }) => apiClient.updateAccount(id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        toast({
          title: 'Success',
          description: 'Account updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update account',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update account',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteAccount(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        toast({
          title: 'Success',
          description: 'Account deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete account',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete account',
        variant: 'destructive',
      });
    },
  });
}

// Product hooks
export function useProducts(params?: PaginationParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => apiClient.getProducts(params),
    select: (data) => {
      console.log('useProducts - Raw data:', data);
      if (data.success && data.data) {
        // Ensure we return { products, pagination } for dashboard table
        return {
          products: data.data.products,
          pagination: data.data.pagination,
        };
      }
      return null;
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductInsert) => apiClient.createProduct(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create product',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create product',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductInsert }) =>
      apiClient.updateProduct(id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update product',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update product',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteProduct(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast({
          title: 'Success',
          description: 'Product deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete product',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete product',
        variant: 'destructive',
      });
    },
  });
}

// Contact Forms hooks
export function useContactForms(
  params?: PaginationParams & { search?: string },
) {
  return useQuery({
    queryKey: ['contact-forms', params],
    queryFn: () => apiClient.getContactForms(params),
    select: (data) => {
      console.log('useContactForms - Raw data:', data);
      if (data.success && data.data) {
        return data.data;
      }
      return null;
    },
  });
}

export function useContactForm(id: string) {
  return useQuery({
    queryKey: ['contact-forms', id],
    queryFn: () => apiClient.getContactForm(id),
    select: (data) => (data.success ? data.data : null),
  });
}

export function useCreateContactForm() {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => apiClient.createContactForm(data),
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: 'Success',
          description:
            'Message sent successfully! We will get back to you soon.',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to send message',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateContactForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
      }>;
    }) => apiClient.updateContactForm(id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['contact-forms'] });
        toast({
          title: 'Success',
          description: 'Contact form updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update contact form',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update contact form',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteContactForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteContactForm(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['contact-forms'] });
        toast({
          title: 'Success',
          description: 'Contact form deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete contact form',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete contact form',
        variant: 'destructive',
      });
    },
  });
}

// Solution hooks
export function useSolutions(params?: PaginationParams) {
  return useQuery({
    queryKey: ['solutions', params],
    queryFn: () => apiClient.getSolutions(params),
    select: (data) => {
      console.log('useSolutions - Raw data:', data);
      if (data.success && data.data) {
        // Ensure we return { solutions, pagination } for dashboard table
        return {
          solutions: data.data.solutions,
          pagination: data.data.pagination,
        };
      }
      return null;
    },
  });
}

export function useCreateSolution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SolutionInsert) => apiClient.createSolution(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['solutions'] });
        toast({
          title: 'Success',
          description: 'Solution created successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create solution',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create solution',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateSolution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SolutionInsert }) =>
      apiClient.updateSolution(id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['solutions'] });
        toast({
          title: 'Success',
          description: 'Solution updated successfully',
        });
      } else {
        console.error('Update solution response error:', response);
        toast({
          title: 'Error',
          description: response.error || 'Failed to update solution',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      console.error('Update solution mutation error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update solution',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteSolution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteSolution(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['solutions'] });
        toast({
          title: 'Success',
          description: 'Solution deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete solution',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete solution',
        variant: 'destructive',
      });
    },
  });
}

// Principal Product hooks
export function usePrincipalProducts(params?: PaginationParams) {
  return useQuery({
    queryKey: ['principal-products', params],
    queryFn: () => apiClient.getPrincipalProducts(params),
    select: (data) => {
      console.log('usePrincipalProducts - Raw data:', data);
      if (data.success && data.data) {
        // Ensure we return { principalProducts, pagination } for dashboard table
        return {
          principalProducts: data.data.principalProducts,
          pagination: data.data.pagination,
        };
      }
      return null;
    },
  });
}

export function useCreatePrincipalProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PrincipalProductInsert) =>
      apiClient.createPrincipalProduct(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['principal-products'] });
        toast({
          title: 'Success',
          description: 'Principal product created successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create principal product',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create principal product',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdatePrincipalProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PrincipalProductInsert }) =>
      apiClient.updatePrincipalProduct(id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['principal-products'] });
        toast({
          title: 'Success',
          description: 'Principal product updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update principal product',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update principal product',
        variant: 'destructive',
      });
    },
  });
}

export function useDeletePrincipalProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deletePrincipalProduct(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['principal-products'] });
        toast({
          title: 'Success',
          description: 'Principal product deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete principal product',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete principal product',
        variant: 'destructive',
      });
    },
  });
}

// Gallery hooks
export function useGalleryItems(
  params?: PaginationParams & { search?: string; category?: string },
) {
  return useQuery({
    queryKey: ['gallery-items', params],
    queryFn: () => apiClient.getGalleryItems(params),
    select: (data) => {
      console.log('useGalleryItems - Raw data:', data);
      if (data.success && data.data) {
        return data.data;
      }
      return null;
    },
  });
}

export function useGalleryItem(id: string) {
  return useQuery({
    queryKey: ['gallery-items', id],
    queryFn: () => apiClient.getGalleryItem(id),
    select: (data) => (data.success ? data.data : null),
  });
}

export function useCreateGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      category: string;
      title: string;
      subtitle: string;
      imagePath: string;
    }) => apiClient.createGalleryItem(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
        toast({
          title: 'Success',
          description: 'Gallery item created successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create gallery item',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create gallery item',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{
        category: string;
        title: string;
        subtitle: string;
        imagePath: string;
      }>;
    }) => apiClient.updateGalleryItem(id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
        toast({
          title: 'Success',
          description: 'Gallery item updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update gallery item',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update gallery item',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteGalleryItem(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
        toast({
          title: 'Success',
          description: 'Gallery item deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete gallery item',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete gallery item',
        variant: 'destructive',
      });
    },
  });
}

// Team hooks
export function useTeams(
  params?: PaginationParams & { search?: string; position?: string },
) {
  return useQuery({
    queryKey: ['teams', params],
    queryFn: async () => {
      console.log('useTeams - Fetching with params:', params);
      const result = await apiClient.getTeams(params);
      console.log('useTeams - API result:', result);
      return result;
    },
    select: (data) => {
      console.log('useTeams - Raw data:', data);
      console.log('useTeams - data.success:', data.success);
      console.log('useTeams - data.data:', data.data);

      if (data.success && data.data) {
        const selected = data.data;
        console.log('useTeams - Selected data (teams):', selected.teams);
        console.log(
          'useTeams - Selected data (pagination):',
          selected.pagination,
        );
        return selected;
      }

      console.log('useTeams - Returning null due to unsuccessful response');
      return null;
    },
  });
}

export function useTeam(id: string) {
  return useQuery({
    queryKey: ['teams', id],
    queryFn: () => apiClient.getTeam(id),
    select: (data) => (data.success ? data.data : null),
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; position: string; imagePath: string }) =>
      apiClient.createTeam(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        toast({
          title: 'Success',
          description: 'Team member created successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create team member',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create team member',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        position: string;
        imagePath: string;
      };
    }) => apiClient.updateTeam(id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        toast({
          title: 'Success',
          description: 'Team member updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update team member',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update team member',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteTeam(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        toast({
          title: 'Success',
          description: 'Team member deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete team member',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete team member',
        variant: 'destructive',
      });
    },
  });
}

// SystemIntegrator hooks
export function useSystemIntegrators(
  params?: PaginationParams & { search?: string },
) {
  return useQuery({
    queryKey: ['systemIntegrators', params],
    queryFn: async () => {
      console.log('useSystemIntegrators - Fetching with params:', params);
      const result = await apiClient.getSystemIntegrators(params);
      console.log('useSystemIntegrators - API result:', result);
      return result;
    },
    select: (data) => {
      console.log('useSystemIntegrators - Raw data:', data);
      console.log('useSystemIntegrators - data.success:', data.success);
      console.log('useSystemIntegrators - data.data:', data.data);

      if (data.success && data.data) {
        const selected = data.data;
        console.log(
          'useSystemIntegrators - Selected data (systemIntegrators):',
          selected.systemIntegrators,
        );
        console.log(
          'useSystemIntegrators - Selected data (pagination):',
          selected.pagination,
        );
        return selected;
      }

      console.log(
        'useSystemIntegrators - Returning null due to unsuccessful response',
      );
      return null;
    },
  });
}

export function useSystemIntegrator(id: string) {
  return useQuery({
    queryKey: ['systemIntegrators', id],
    queryFn: () => apiClient.getSystemIntegrator(id),
    select: (data) => (data.success ? data.data : null),
  });
}

export function useCreateSystemIntegrator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      icon: string;
      slug: string;
    }) => apiClient.createSystemIntegrator(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['systemIntegrators'] });
        toast({
          title: 'Success',
          description: 'System integrator created successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create system integrator',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create system integrator',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateSystemIntegrator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      description: string;
      icon: string;
      slug: string;
    }) => apiClient.updateSystemIntegrator(data.id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['systemIntegrators'] });
        toast({
          title: 'Success',
          description: 'System integrator updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update system integrator',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update system integrator',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteSystemIntegrator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteSystemIntegrator(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['systemIntegrators'] });
        toast({
          title: 'Success',
          description: 'System integrator deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete system integrator',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete system integrator',
        variant: 'destructive',
      });
    },
  });
}

// Collaborator hooks
const CollaboratorSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  longDescription: z.string(),
  logo: z.string(),
  website: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export function useCollaborators(
  params?: PaginationParams & { search?: string },
) {
  return useQuery({
    queryKey: ['collaborators', params],
    queryFn: () => apiClient.getCollaborators(params),
    select: (data) => (data.success && data.data ? data.data : null),
  });
}

export function useCollaborator(id: string) {
  return useQuery({
    queryKey: ['collaborators', id],
    queryFn: () => apiClient.getCollaborator(id),
    select: (data) => (data.success ? data.data : null),
    enabled: !!id,
  });
}

export function useCreateCollaborator() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      data: Omit<
        z.infer<typeof CollaboratorSchema>,
        'id' | 'createdAt' | 'updatedAt'
      >,
    ) => apiClient.createCollaborator(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['collaborators'] });
        toast({
          title: 'Success',
          description: 'Collaborator created successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create collaborator',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create collaborator',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteCollaborator() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteCollaborator(id),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['collaborators'] });
        toast({
          title: 'Success',
          description: 'Collaborator deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete collaborator',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete collaborator',
        variant: 'destructive',
      });
    },
  });
}
