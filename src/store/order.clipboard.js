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
      if (!this.empty()) {
        console.log("Erasing copied order");
      } else console.log("Empty clipboard");
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
  },
});

function isObject(obj) {
  return obj != null && typeof obj === "object";
}
