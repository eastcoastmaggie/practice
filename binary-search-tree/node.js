const node = () => {
    return {
        value : {
            value : null,
            writable : true,
            configurable : true,
        },
        leftChild : {
            value : null,
            writable : true,
            configurable : true,
        },
        rightChild : {
            value : null,
            writable : true,
            configurable : true,
        }
    };
};
module.exports = node;