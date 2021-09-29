export const uploadRequest = (url, data, token) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            "token": token
        },
        body: data
    };
    return fetch(url + "/snap", requestOptions).then((response) => { return response.json(); }).then((reponse) => { return alert("Le Snap a bien été envoyé."); }).catch((error) => { return { error_code: -3, error_msg: "Veuillez ressayer." }; });
};

export const uploadEquipImg = async (params, token) => {
    return await uploadRequest("http://149.91.89.133:6088", params, token);
};