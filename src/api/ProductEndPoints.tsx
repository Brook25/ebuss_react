type epFunction = ((arg?: string) => string);


const ProductEndPoints: Record<string, epFunction> = {
    'all': (queryParams?: string) => `/products/all${queryParams ? `?${queryParams}` : ''}`,
    'category': (categoryId?: string, queryParams?: string) => `/products/category/${categoryId}${queryParams ? `?${queryParams}` : ''}`,
    'search': (queryParams?: string) => `/products/search?q=${queryParams}`,
    'subCategory': (subcategoryId?: string, queryParams?: string) => `/products/subcategory/${subcategoryId}${queryParams ? `?${queryParams}` : ''}`,
    'store': (queryParams?: string) => `/products/store/${queryParams ? `?${queryParams}` : ''}`,
    'popular': (pathSegment?: string, queryParams?: string) => `/products/popular/${pathSegment}/${queryParams ? `?${queryParams}` : ''}` 
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
        return null;
    }

}

export default ProductEndPoints;