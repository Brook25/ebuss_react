type epFunction = ((arg?: string) => string);




const ProductEndPoints: Record<string, epFunction> = {
    'all': () => '/products/all',
    'category': (categoryId?: string) => `/products/category/${categoryId}`,
    'search': (query?: string) => `/products/search?q=${query}`,
    'subCategory': (subcategoryId?: string) => `/products/subcategory/${subcategoryId}`,
    'store': () => `/products/store`,
    'popular': (pathSegment?: string) => `/products/popular/${pathSegment}` 
};


const resolveEndpoint = (resource: string, identifier: string | null = null) => {
    const epResolver = ProductEndPoints[resource as keyof typeof ProductEndPoints];
    if (! (typeof epResolver === 'function')) {
      console.error(`Endpoint for resource '${resource}' is not a function.`);
      return null;
    }
    try {
    if (identifier !== null) return epResolver(identifier);
    return epResolver();
    }
    catch (error) {
        console.error(`Error resolving endpoint for resource ${resource} with error: ${error}`);
    }

}

export default ProductEndPoints;