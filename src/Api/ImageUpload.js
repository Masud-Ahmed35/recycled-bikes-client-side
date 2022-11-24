export const imageUpload = image => {
    const formData = new FormData();
    formData.append('image', image);
    fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_apiKey}`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(imageData => console.log(imageData.data.display_url))
}