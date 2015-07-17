module.exports = directories =  {

    rootDir: "/home/bambilla/media/",

    photos: function(){
        return this.rootDir + "photos"
    },
    documents: function(){
        return this.rootDir + "documents"
    }
};