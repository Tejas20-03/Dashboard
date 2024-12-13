export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    joinDate: string;
  }
  
  export const mockUsers: User[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 2 === 0 ? 'Admin' : 'User',
    joinDate: new Date(2024, 0, index + 1).toLocaleDateString()
  }));
  
  export const getPaginatedUsers = (page: number, perPage: number) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    
    return {
      users: mockUsers.slice(start, end),
      total: mockUsers.length,
      totalPages: Math.ceil(mockUsers.length / perPage)
    };
  };
  