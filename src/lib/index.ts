import LocalStorageService from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  getRequest: any;
  paging: any;
  setPaging: any;
  userId?: string;
};
// GET DATA INFINITY
const useGetData = ({ getRequest, paging, setPaging }: Props) => {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [isError, setIdError] = useState<any>();
  const [res, setRes] = useState<any[]>([]);
  const [resSearch, setResSearch] = useState<any[]>([]);
  const handleGetData = async (paging: any) => {
    setIsLoading(true);
    try {
      const data = await getRequest(paging);
      if (data && data.length > 0) {
        setPaging({
          pageSize: paging.pageSize,
          pageIndex: paging.pageIndex + 1,
          ...(paging?.keyWord && { keyWord: paging.keyWord }),
        });

        if (
          paging?.keyWord &&
          paging.keyWord.length > 0 &&
          paging.keyWord !== ""
        ) {
          setResSearch([...data]);
        } else setRes((prev) => [...prev, ...data]);
      } else {
        if (!data || data.length === 0 || data.length < paging.pageSize)
          setShowLoadMore(false);
      }
    } catch (error) {
      console.log(error);
      setIdError(error);
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

  return { ref, res, resSearch, isLoading, showLoadMore, isError };
};

// GET DATA NEW FEED
// const useGetDataNewFeed = ({ getRequest, paging, setPaging }: Props) => {
//   const { ref, inView } = useInView();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
//   const [isError, setIdError] = useState<any>();

//   const [res, setRes] = useState<any[]>([]);
//   const handleGetData = async (paging: any) => {
//     setIsLoading(true);
//     try {
//       const data = await getRequest(paging);
//       if (data && data.length > 0) {
//         setRes((prev) => [...prev, ...data]);
//         if (data.length === paging.pageSize) {
//           setPaging({
//             pageSize: paging.pageSize,
//             pageIndex: paging.pageIndex + 1,
//             mileStoneId: data[data.length - 1]?.id,
//             ...(paging?.keyWord && { keyWord: paging.keyWord }),
//           });
//         }
//       }
//       if (!data || data.length === 0 || data.length < paging.pageSize)
//         setShowLoadMore(false);
//     } catch (error) {
//       console.log(error);
//       setIdError(error);
//       setShowLoadMore(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log(paging);
//     if (inView) {
//       handleGetData(paging);
//     }
//   }, [inView, paging]);

//   return { ref, res, isLoading, showLoadMore, isError };
// };
const useGetDataNewFeed = ({ getRequest, paging, setPaging }: Props) => {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [isError, setIsError] = useState<any>(null);
  const [res, setRes] = useState<any[]>([]);

  const handleGetData = async (paging: any) => {
    setIsLoading(true);
    try {
      const data = await getRequest(paging);
      if (data && data.length > 0) {
        setRes((prev) => [...prev, ...data]);
        const lastItem = data[data.length - 1];
        setPaging((prevPaging: any) => ({
          ...prevPaging,
          pageSize: paging.pageSize,
          pageIndex: paging.pageIndex + 1,
          mileStoneId: lastItem?.id,
          ...(paging?.keyWord && { keyWord: paging.keyWord }),
        }));
        setShowLoadMore(data.length === paging.pageSize);
      } else {
        setShowLoadMore(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(error);
      setShowLoadMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && showLoadMore) {
      handleGetData(paging);
    }
  }, [inView, paging, showLoadMore]);

  return { ref, res, isLoading, showLoadMore, isError };
};

// GET POST OF USER
const useGetDataPostByUserId = ({
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
      const data = await getRequest({ searchObject: paging, userId: userId });
      if (data && data.length > 0) {
        setRes((prev) => [...prev, ...data]);
        if (data.length === paging.pageSize) {
          setPaging({
            pageSize: paging.pageSize,
            pageIndex: paging.pageIndex + 1,
            mileStoneId: data[length - 1]?.id,
          });
        }
      }

      if (!data || data.length === 0 || data.length < paging.pageSize)
        setShowLoadMore(false);
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
  console.log(res);

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
  requestId?: string;
};
const useGetAllData = ({ getRequest, requestId }: GetAllDataProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIdError] = useState<any>();

  const [res, setRes] = useState<any[]>([]);
  const handleGetData = async () => {
    setIsLoading(true);
    let data;
    try {
      if (requestId) {
        data = await getRequest(requestId);
      } else {
        data = await getRequest();
      }

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

type GetAllDataByKeywordProps = {
  getRequest: any;
  paging?: any;
};
const useGetAllDataByKeyword = ({
  getRequest,
  paging,
}: GetAllDataByKeywordProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIdError] = useState<any>();

  const [res, setRes] = useState<any>({});
  const handleGetData = async () => {
    setIsLoading(true);
    let data;
    try {
      if (paging) {
        data = await getRequest(paging);
      } else {
        data = await getRequest();
      }

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
type GetDataPagingType = {
  getRequest: any;
  paging: any;
};

// GET DATA PAGINATION
const useGetDataPagination = ({ getRequest, paging }: GetDataPagingType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLeftDisable, setIsLeftDisable] = useState<boolean>(false);
  const [isRightDisable, setIsRightDisable] = useState<boolean>(false);
  const [isError, setIdError] = useState<any>();

  const [res, setRes] = useState<any[]>([]);
  const handleGetData = async (paging: any) => {
    setIsLoading(true);
    if (paging?.pageIndex === 1 || paging?.pageIndex === 0) {
      setIsLeftDisable(true);
      setIsRightDisable(false);
    } else {
      setIsLeftDisable(false);
    }
    try {
      const data = await getRequest(paging);
      if (data && data.length > 0) {
        setRes(data);
        if (data.length < paging.pageSize) setIsRightDisable(true);
        else setIsRightDisable(false);
      }
      if (!data || data.length === 0 || data.length < paging.pageSize)
        setIsRightDisable(true);
    } catch (error) {
      setIsRightDisable(true);
      console.log(error);
      setIdError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (paging) {
      handleGetData(paging);
    }
  }, [paging]);

  return { res, isLoading, isLeftDisable, isRightDisable, isError };
};

type GetDataObjectPagingType = {
  getRequest: any;
  paging: any;
};

// GET DATA RETURN OBJECT
const useGetDataObjectPagination = ({
  getRequest,
  paging,
}: GetDataObjectPagingType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLeftDisable, setIsLeftDisable] = useState<boolean>(false);
  const [isRightDisable, setIsRightDisable] = useState<boolean>(false);
  const [isError, setIdError] = useState<any>();

  const [res, setRes] = useState<any>({});
  const handleGetData = async (paging: any) => {
    setIsLoading(true);
    if (paging?.pageIndex === 1) {
      setIsLeftDisable(true);
      setIsRightDisable(false);
    } else {
      setIsLeftDisable(false);
    }
    try {
      const data = await getRequest(paging);
      if (data.data && data.data.length > 0) {
        setRes({ ...data });
        if (data.data.length < paging.pageSize) setIsRightDisable(true);
        else setIsRightDisable(false);
      }
      if (!data || data.data.length < paging.pageSize || data.data.length === 0)
        setIsRightDisable(true);
    } catch (error) {
      setIsRightDisable(true);
      console.log(error);
      setIdError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (paging) {
      handleGetData(paging);
    }
  }, [paging]);

  return {
    res,
    isLoading,
    isLeftDisable,
    isRightDisable,
    isError,
  };
};

export const useCheckUserSendRequestJoinGroup = (groupId: any) => {
  const currentUser = LocalStorageService.getLoggedInUser();
  const { groupStore } = useStore();
  const { getAllWait } = groupStore;
  const { res: data } = useGetAllData({
    getRequest: getAllWait,
    requestId: groupId,
  });
  const user = data?.find((user) => user?.id === currentUser?.id);
  if (user) return true;
  else return false;
};

export {
  useGetDataByUserId,
  useGetAllData,
  useGetDataPagination,
  useGetDataObjectPagination,
  useGetDataNewFeed,
  useGetDataPostByUserId,
  useGetAllDataByKeyword,
};

export default useGetData;
