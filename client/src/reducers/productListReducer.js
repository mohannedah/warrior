import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_SCREEN_REQUEST,
  PRODUCT_SCREEN_SUCCESS,
  PRODUCT_SCREEN_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  REVIEW_PRODUCT_REQUEST,
  REVIEW_PRODUCT_FAIL,
  REVIEW_PRODUCT_SUCCESS,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_FAIL,
  TOP_PRODUCTS_SUCCESS,
  REVIEW_PRODUCT_RESET,
} from "../constants/productConstants";
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
      break;
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
      break;

    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      break;

    default:
      return state;
  }
};

export const productReducer = (
  state = { product: {}, reviews: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_SCREEN_REQUEST:
      return {
        ...state,
        loading: true,
        product: {},
        reviews: [],
      };

    case PRODUCT_SCREEN_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        reviews: action.payload.reviews,
      };

    case PRODUCT_SCREEN_FAIL:
      return {
        error: action.payload,
        product: {},
        loading: false,
      };

    default:
      return state;
  }
};

export const deleteProductReducer = (
  state = { allProducts: [], deleted: false },
  action
) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
      break;

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
        allProducts: action.payload,
      };
      break;

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        deleted: false,
      };

    default:
      return state;
      break;
  }
};

export const productListAdminReducer = (
  state = { allProducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_ADMIN_REQUEST:
      return {
        loading: true,
        allProducts: [],
      };
      break;
    case PRODUCT_LIST_ADMIN_SUCCESS:
      return {
        loading: false,
        allProducts: action.payload,
      };
      break;

    case PRODUCT_LIST_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      break;

    default:
      return state;
  }
};

export const createProductReducer = (
  state = { created: false, createdProduct: {} },
  action
) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        created: false,
      };
      break;

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true,
        createdproduct: action.payload,
        id: action.payload._id,
      };
      break;

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        created: false,
      };

    case CREATE_PRODUCT_RESET:
      return {};

    default:
      return state;
      break;
  }
};

export const updateProductReducer = (state = { updated: false }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        updated: false,
      };
      break;

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
      };
      break;

    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        updated: false,
      };

    case UPDATE_PRODUCT_RESET:
      return {};

    default:
      return state;
      break;
  }
};

export const reviewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_PRODUCT_REQUEST:
      return {
        ...state,
        loadingProductReview: true,
      };
      break;

    case REVIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingProductReview: false,
        successProductReview: true,
      };
      break;

    case REVIEW_PRODUCT_FAIL:
      return {
        ...state,
        loadingProductReview: false,
        errorProductReview: action.payload,
        successProductReview: false,
      };

    case REVIEW_PRODUCT_RESET:
      return {};

    default:
      return state;
      break;
  }
};

export const topProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case TOP_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingProducts: true,
      };
      break;

    case TOP_PRODUCTS_SUCCESS:
      return {
        ...state,
        loadingProducts: false,
        products: action.payload.products,
      };
      break;

    case TOP_PRODUCTS_FAIL:
      return {
        ...state,
        loadingProducts: false,
        errorProducts: action.payload,
      };

    default:
      return state;
      break;
  }
};
