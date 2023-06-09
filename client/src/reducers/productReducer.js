import ProductController from '../controllers/productController'
const useReducer = (() =>{
  const ACTION_TYPES = {
    FETCH_SUCCESS: "fetchSuccess",
    FETCH_ERROR: "fetchError"
  }
  async function fetchProducts(dispatch,controllerMethod){
    try {
      const productController = new ProductController();
      const products = await productController.controllerMethod();
      console.log(products)
      dispatch({type: ACTION_TYPES.FETCH_SUCCESS, payload: products})
    } catch (error) {
      dispatch({type: ACTION_TYPES.FETCH_ERROR, error: error.message})
    }
  }
  function reducer(state,action){
    switch(action.type){
      case ACTION_TYPES.FETCH_SUCCESS: return{
        ...state,
        loading: false,
        data: action.payload
      };

      case ACTION_TYPES.FETCH_ERROR: return{
        ...state,
        loading: false,
        error: action.error
      }

      default:
        state
    }
  }
})
