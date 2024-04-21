import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  getRequest: any;
  paging: any;
  setPaging: any;
};
const useGetData = ({ getRequest, paging, setPaging }: Props) => {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);

  const [res, setRes] = useState<any[]>([]);
  // const { relationshipStore } = useStore();
  // const { getCurrentFriend } = relationshipStore;
  const handleGetData = async (paging: any) => {
    setIsLoading(true);
    try {
      const data = await getRequest(paging);
      if (data && data.length > 0) {
        setPaging({
          pageSize: paging.pageSize,
          pageIndex: paging.pageIndex + 1,
        });
        setRes((prev) => [...prev, ...data]);
      } else {
        if (!data || data.length === 0 || data.length < paging.pageSize)
          setShowLoadMore(false);
      }
    } catch (error) {
      console.log(error);
      setShowLoadMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      handleGetData(paging);
    }
  }, [inView, paging]);

  return { ref, inView, res, isLoading, showLoadMore };
};

export default useGetData;
