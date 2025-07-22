import type { Product, ProductInsert } from '@/app/dashboard/products/schema';

type ApiResponse<T> = {
  data?: T;
  error?: string;
  success: boolean;
};

export type PaginationParams = {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  private buildQueryString(
    params: Record<string, string | number | boolean | undefined | null>,
  ): string {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, value.toString());
      }
    });
    return query.toString();
  }

  // Account methods (placeholder types for now)
  async getAccounts(params?: PaginationParams & { companyId?: string }) {
    const queryString = this.buildQueryString(params || {});
    return this.request<PaginatedResponse<Record<string, unknown>>>(
      `/accounts${queryString ? `?${queryString}` : ''}`,
    );
  }

  async createAccount(data: {
    name: string;
    parentId?: string;
    isGroup: boolean;
    companyId: string;
  }) {
    return this.request<Record<string, unknown>>('/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAccount(
    id: string,
    data: {
      name: string;
      parentId?: string;
      isGroup: boolean;
      companyId: string;
    },
  ) {
    return this.request<Record<string, unknown>>(`/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAccount(id: string) {
    return this.request<{ success: boolean }>(`/accounts/${id}`, {
      method: 'DELETE',
    });
  }

  // Product methods
  async getProducts(params?: PaginationParams) {
    const queryString = this.buildQueryString(params || {});
    return this.request<PaginatedResponse<Product>>(
      `/products${queryString ? `?${queryString}` : ''}`,
    );
  }

  async createProduct(data: ProductInsert) {
    return this.request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: ProductInsert) {
    return this.request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request<{ success: boolean }>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Form methods
  async getContactForms(params?: PaginationParams & { search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.perPage)
      searchParams.append('limit', params.perPage.toString());
    if (params?.search) searchParams.append('search', params.search);

    const query = searchParams.toString();
    return this.request<{
      contactForms: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>(`/contact-forms${query ? `?${query}` : ''}`);
  }

  async getContactForm(id: string) {
    return this.request<{ contactForm: any }>(`/contact-forms/${id}`);
  }

  async createContactForm(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    return this.request<{ id: string; message: string }>('/contact-forms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContactForm(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }>,
  ) {
    return this.request<{ contactForm: any; message: string }>(
      `/contact-forms/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
    );
  }

  async deleteContactForm(id: string) {
    return this.request<{ message: string }>(`/contact-forms/${id}`, {
      method: 'DELETE',
    });
  }

  // Gallery methods
  async getGalleryItems(params?: PaginationParams & { search?: string; category?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.perPage) searchParams.append('limit', params.perPage.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.category) searchParams.append('category', params.category);
    
    const query = searchParams.toString();
    return this.request<{
      galleryItems: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>(`/gallery${query ? `?${query}` : ''}`);
  }

  async getGalleryItem(id: string) {
    return this.request<{ galleryItem: any }>(`/gallery/${id}`);
  }

  async createGalleryItem(data: {
    category: string;
    title: string;
    subtitle: string;
    imagePath: string;
  }) {
    return this.request<{ galleryItem: any; message: string }>('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateGalleryItem(id: string, data: Partial<{
    category: string;
    title: string;
    subtitle: string;
    imagePath: string;
  }>) {
    return this.request<{ galleryItem: any; message: string }>(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGalleryItem(id: string) {
    return this.request<{ message: string }>(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
export type { ApiResponse };
