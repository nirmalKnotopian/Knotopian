const ButtonLoader = ({ customCss }: { customCss?: string }) => {
  return (
    <div className={`flex  items-center justify-center   `}>
      <div
        className={`animate-spin rounded-full border-4 border-primary  border-t-transparent p-3 ${customCss}`}
      ></div>
    </div>
  );
};

export default ButtonLoader;
