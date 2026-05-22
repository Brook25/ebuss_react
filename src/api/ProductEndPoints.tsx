interface urlParamsType {
    identifier?: string;
    queryParams: string | null;
} 
type epFunction = ((urlParams: urlParamsType) => string);


const ProductEndPoints: Record<string, epFunction> = {
    'all': ({ queryParams }) => `/products/all${queryParams ? `?${queryParams}` : ''}`,
    'category': ({ identifier, queryParams }) => `/products/category/${identifier}${queryParams ? `?${queryParams}` : ''}`,
    'search': ({ queryParams }) => `/products/search?q=${queryParams}`,
    'subCategory': ({ identifier, queryParams }) => `/products/subcategory/${identifier}${queryParams ? `?${queryParams}` : ''}`,
    'store': ({ queryParams }) => `/products/store/${queryParams ? `?${queryParams}` : ''}`,
    'popular': ({ identifier, queryParams }) => `/products/popular/${identifier}/${queryParams ? `?${queryParams}` : ''}` 
};

const resolveEndpoint = (resource: string, identifier: string | null = null, queryParams: string | null): string | null => {
    const epResolver = ProductEndPoints[resource as keyof typeof ProductEndPoints];
    const urlParams: urlParamsType = { queryParams, ...( identifier !== null ? { identifier } : {} ) };
    if (! (typeof epResolver === 'function')) {
      console.log(`Endpoint for resource '${resource}' is not a function.`);
      return null;
    }
    return epResolver(urlParams);

}

export { ProductEndPoints, resolveEndpoint };