type Props = {
  title: string;
};
const NoData = ({ title }: Props) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[300px] h-[300px] ">
        <img src="/empty-box.png" alt="nodata" className="w-full h-full" />
      </div>
      <p className="text-center">{title}</p>
    </div>
  );
};

export default NoData;
