import qs from "query-string"
import { useInfiniteQuery } from "@tanstack/react-query";

export const useChatQuery = ({ queryKey, channelId }) => {

    const fetchMessages = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: `${import.meta.env.VITE_API_URL}/message`,
            query: {
                channelId,
                cursor: pageParam,
            }
        }, { skipNull: true })

        const res = await fetch(url)
        return res.json()
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => {
            return lastPage?.nextCursor ?? undefined;
        },
        refetchInterval: 2000,
    })

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }
}

export const useConversationQuery = ({ queryKey, conversationId }) => {

    const fetchMessages = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: `${import.meta.env.VITE_API_URL}/direct-message`,
            query: {
                conversationId,
                cursor: pageParam,
            }
        }, { skipNull: true })

        const res = await fetch(url)
        return res.json()
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => {
            return lastPage?.nextCursor ?? undefined;
        },
        refetchInterval: 5000,
    })

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }
}