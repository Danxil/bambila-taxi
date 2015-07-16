module.exports = directories =  {

    rootDir: "/home/bambilla/media/bambilla_image_storage/",

    photos: function(){
        return this.rootDir + "photos"
    },
    documents: function(){
        return this.rootDir + "documents"
    }
};