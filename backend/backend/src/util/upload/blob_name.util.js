const getBlobName = (originalName) => {
    const identifier = Math.random().toString().replace(/0\./, ""); 
    return `${identifier}-${originalName}`;
};


export default getBlobName;