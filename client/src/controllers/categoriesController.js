import axios from 'axios'

class CategoriesController{
    async getItems(){
        try{
            const getQuery = await axios.get('http://localhost:1100/categories')
            return getQuery.data
        }catch(err){
            console.error(err);
        }
    }
}

export default CategoriesController