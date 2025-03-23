import { useEffect, useState } from "react";
import apiFetcher from "@/fetcher/apiFetcher";

// Define the data structure for channels
interface IChannelsData {
    id: string;
    code: string;
    categories: [];
}

// ✅ Create a reusable hook for fetching channels
export function useChannels() {
    const [channelsData, setChannelsData] = useState<IChannelsData[]>([]);
    const [numberOfItems, setItems] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        apiFetcher.get("/channels")
            .then((response) => {
                // ✅ Extract `items` array instead of `hydra:member`
                setItems(response.data.totalItems || 0);
                setChannelsData(response.data.items || []);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { channelsData, numberOfItems, loading, error };
}
