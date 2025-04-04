const ImageUploading = ({ loading }) => {
  return loading ? (
    <div
      className="flex justify-center items-center absolute"
      style={{
        height: 155,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.7)",
      }}
    >
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  ) : (
    false
  );
};

export default ImageUploading;
