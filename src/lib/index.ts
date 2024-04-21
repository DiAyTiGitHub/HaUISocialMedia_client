import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  getRequest: any;
  paging: any;
  setPaging: any;
  userId?: string;
};
const useGetData = ({ getRequest, paging, setPaging }: Props) => {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [isError, setIdError] = useState<any>();

  const [res, setRes] = useState<any[]>([]);
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
      setIdError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      handleGetData(paging);
    }
  }, [inView, paging]);

  return { ref, res, isLoading, showLoadMore, isError };
};

const useGetDataByUserId = ({
  getRequest,
  paging,
  setPaging,
  userId,
}: Props) => {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [isError, setIdError] = useState<any>();

  const [res, setRes] = useState<any[]>([]);
  const handleGetData = async (paging: any) => {
    setIsLoading(true);
    try {
      const data = await getRequest(paging, userId);
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
      setIdError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      handleGetData(paging);
    }
  }, [inView, paging]);

  return { ref, res, isLoading, showLoadMore, isError };
};

type GetAllDataProps = {
  getRequest: any;
};
const useGetAllData = ({ getRequest }: GetAllDataProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIdError] = useState<any>();

  const [res, setRes] = useState<any[]>([]);
  const handleGetData = async () => {
    setIsLoading(true);
    try {
      const data = await getRequest();

      setRes(data);
    } catch (error) {
      console.log(error);
      setIdError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return { res, isLoading, isError };
};

export { useGetDataByUserId, useGetAllData };

export default useGetData;
