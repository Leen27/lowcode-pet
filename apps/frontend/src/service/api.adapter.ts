// Select the DOM-element, so that you can replace it with content
let PROJECT_ID = "b9k2lt78";
let DATASET = "production";

// Compose the URL for your project's endpoint and add the query
const getUrl = (QUERY: string) => `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

export type TCompCategory = {
    key: string;
    thumbnail: string;
    pkgUrl: string;
}

export type TUseCompRepo = {
    getCategory: () => Promise<TCompCategory[]>
}

export const useCompRepo = (): TUseCompRepo => {
    const QUERY = encodeURIComponent(`
        *[_type == "component"]{
            _id,
            key,
            pkgUrl,
            'thumbnail': thumbnail.asset->url
        }
    `);

    return {
        // 获取目录
        async getCategory() {
            return fetch(getUrl(QUERY))
                .then((res) => res.json())
                .then(({ result }) => result || []) 
        }
    }
}

