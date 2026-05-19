interface urlParams {
    identifier?: string;
    queryParams: string | null;
} 
type epFunction = ((urlParams: urlParams) => string);


const ProductEndPoints: Record<string, epFunction> = {
    'all': ({ queryParams }) => `/products/all${queryParams ? `?${queryParams}` : ''}`,
    'category': ({ identifier, queryParams }) => `/products/category/${identifier}${queryParams ? `?${queryParams}` : ''}`,
    'search': ({ queryParams }) => `/products/search?q=${queryParams}`,
    'subCategory': ({ identifier, queryParams }) => `/products/subcategory/${identifier}${queryParams ? `?${queryParams}` : ''}`,
    'store': ({ queryParams }) => `/products/store/${queryParams ? `?${queryParams}` : ''}`,
    'popular': ({ identifier, queryParams }) => `/products/popular/${identifier}/${queryParams ? `?${queryParams}` : ''}` 
};

const resolveEndpoint = (resource: string, identifier: string | null = null, queryParams: string | null) => {
    const epResolver = ProductEndPoints[resource as keyof typeof ProductEndPoints];
    const urlParams = { queryParams, ...( identifier !== null ? { identifier } : {}) };
    if (! (typeof epResolver === 'function')) {
      console.error(`Endpoint for resource '${resource}' is not a function.`);
      return null;
    }
    try {
    if (identifier !== null) return epResolver({ identifier, queryParams });
    }
    catch (error) {
        console.error(`Error resolving endpoint for resource ${resource} with error: ${error}`);
        return null;
    }

}

export default ProductEndPoints;