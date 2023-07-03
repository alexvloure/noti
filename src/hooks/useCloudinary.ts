export const useCloudinary = () => {
  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'fn1pbozo');
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const imageData = await res.json();
    return imageData;
  };

  return { uploadImage };
};
