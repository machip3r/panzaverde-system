import { defineStore } from "pinia";

export const useOrderStore = defineStore("orderClipboard", {
  state: () => {
    return {
      order: {},
    };
  },

  actions: {
    copyOrder(order) {
      if (this.equals(this.order, order)) {
        console.log("Trying to copy same order");
        return false;
      }

      console.log("Empty clipboard or different order");
      this.order = JSON.parse(JSON.stringify(order));

      return true;
    },

    deleteOrder() {
      if (this.empty()) return;

      for (let key in this.order) delete this.order[key];
    },

    equals(thisOrder, order) {
      const thisKeys = Object.keys(thisOrder);
      const otherKeys = Object.keys(order);

      if (thisKeys.length != otherKeys.length) return false;

      for (const key of thisKeys) {
        const thisElem = thisOrder[key];
        const otherElem = order[key];

        const areObjects = isObject(thisElem) && isObject(otherElem);

        if (
          (areObjects && !this.equals(thisElem, otherElem)) ||
          (!areObjects && thisElem !== otherElem)
        ) {
          return false;
        }
      }

      return true;
    },

    deleteProduct(i) {
      this.order.products.splice(i, 1);
    },

    showOrder() {
      console.log(this.order);
    },

    empty() {
      return (
        Object.keys(this.order).length === 0 || this.order.products.length <= 0
      );
    },

    setQtty(i, qtty) {
      this.order.products[i].op_quantity =
        qtty < 1 || qtty === undefined ? 1 : parseInt(qtty);

      console.log("Qtty changed: ", this.order.products[i].op_quantity);
    },

    incrementProduct(i) {
      ++this.order.products[i].op_quantity;

      return true;
    },

    decrementProduct(i) {
      if (this.order.products[i].op_quantity - 1 < 1) return false;

      --this.order.products[i].op_quantity;
      return true;
    },

    productsLength() {
      return this.order.products.length;
    },

    prepareInsertion() {
      return this.order.products.map((product) => {
        return {
          id_product: product.id_product,
          op_quantity: product.op_quantity,
          p_price: parseFloat(product.p_price),
        };
      });
    },
  },
});

function isObject(obj) {
  return obj != null && typeof obj === "object";
}
