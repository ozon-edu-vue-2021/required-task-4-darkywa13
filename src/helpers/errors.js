const rules = {
  russianSymbols: (val) => /^[а-я]+$/iu.test(val),
  latinSymbols: (val) => /^[a-z]+$/iu.test(val),
  email: (val) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(val);
  },
};

export default {
  validate(vm, payload, handlers) {
    if (!vm.formDirty) {
      return { error: false, text: "" };
    }

    try {
      handlers.forEach((handler) => {
        if (typeof this.handlers[handler] === "function") {
          const result = this.handlers[handler](payload);

          if (result?.error) {
            throw new Error(result.text);
          }
        }
      });
    } catch (error) {
      return { error: true, text: error.toString() };
    }

    return { error: false, text: "" };
  },
  handlers: {
    required({ val }) {
      if (!val.trim()) {
        return { error: true, text: "Поле обязательное" };
      }
    },
    requiredSelect({ val }) {
      if (!val) {
        return { error: true, text: "Поле обязательное" };
      }
    },
    cyrillic({ val }) {
      if (!rules.russianSymbols(val)) {
        return { error: true, text: "Только русские символы" };
      }
    },
    latin({ val }) {
      if (!rules.latinSymbols(val)) {
        return { error: true, text: "Только латинские символы" };
      }
    },
    date({ val }) {
      const date = new Date(val);
      const now = new Date();

      if (date > now) {
        return { error: true, text: "Некорректная дата" };
      }
    },
    email({ val }) {
      if (!rules.email(val)) {
        return { error: true, text: "Введите корректный адрес почты" };
      }
    },
    length({ val, len }) {
      if (len && val.length !== len) {
        return { error: true, text: `Длина поля должна быть ${len}` };
      }
    },
  },
};
