

const ProductEndPoints = {
    all: '/products/all',
    category: (categoryId: number) => `/products/category/${categoryId}`,
    search: (query: string) => `/products/search?q=${query}`,
    subCategory: (subcategoryId: number) => `/products/subcategory/${subcategoryId}`,
    store: () => `/products/store`,
    popular: (pathSegment: string) => `/products/popular/${pathSegment}` 
};


const resolveEndpoint = (resource: string, identifier: number | string | null = null) => {
    const epResolver = ProductEndPoints[resource as keyof typeof ProductEndPoints];
    if (! (typeof epResolver === 'function')) 
      return new Error(`Endpoint for resource '${resource}' is not a function.`);
    try {
        if (identifier) return epResolver(identifier);
        return epResolver();
    } 
    catch (error) {
        console.error(`Error resolving endpoint for resource '${resource}':`, error);
        return null;
    }
}

export default ProductEndPoints;