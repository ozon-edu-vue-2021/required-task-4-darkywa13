<template>
  <div class="personal-form">
    <form class="form" @submit.prevent="formSubmit" novalidate>
      <fieldset-grid legend="Личные данные">
        <div class="form__row">
          <field-text
            v-model="formData.lastName"
            label="Фамилия"
            field-name="lastName"
            :error="lastNameError.text"
          />

          <field-text
            v-model="formData.firstName"
            label="Имя"
            field-name="firstName"
            :error="firstNameError.text"
          />

          <field-text
            v-model="formData.middleName"
            label="Отчество"
            field-name="middleName"
            :error="middleNameError.text"
          />
        </div>

        <div class="form__row">
          <field-text
            v-model="formData.birthday"
            label="Дата рождения"
            field-name="birthday"
            type="date"
            :error="errorBirthday.text"
          />

          <field-text
            v-model="formData.email"
            label="E-mail"
            field-name="email"
            type="email"
            :error="emailError.text"
          />
        </div>
      </fieldset-grid>

      <fieldset-grid legend="Пол">
        <div class="form__row">
          <radio-group
            v-model="formData.gender"
            :options="genderOptions"
            radioName="radio-gender"
            :error="genderError.text"
          />
        </div>
      </fieldset-grid>

      <fieldset-grid legend="Паспортные данные">
        <div class="form__row">
          <field-select
            v-model="formData.citizenship"
            label="Гражданство"
            field-name="citizenship"
            :items="citizenshipItems"
            width="300px"
            placeholder="Выберите гражданство"
            with-search
            :error="citizenshipError.text"
          />
        </div>

        <template v-if="formData.citizenship">
          <div v-if="selectedRussia" class="form__row">
            <field-text
              v-model="formData.passportSeries"
              label="Серия паспорта"
              field-name="passport-series"
              type="number"
              :error="passportSeriesError.text"
            />

            <field-text
              v-model="formData.passportNumber"
              label="Номер паспорта"
              field-name="passport-number"
              type="number"
              :error="passportNumberError.text"
            />

            <field-text
              v-model="formData.passportDate"
              label="Дата выдачи"
              field-name="passport-date"
              type="date"
              :error="passportDateError.text"
            />
          </div>

          <template v-else>
            <div class="form__row">
              <field-text
                v-model="formData.alienLastName"
                label="Фамилия на латинице"
                field-name="alien-lat-name"
                :error="alienLastNameError.text"
              />

              <field-text
                v-model="formData.alienFirstName"
                label="Имя на латинице"
                field-name="alien-first-name"
                :error="alienFirstNameError.text"
              />
            </div>

            <div class="form__row">
              <field-text
                v-model="formData.alienPassportNumber"
                label="Номер паспорта"
                field-name="alien-passport-number"
                type="number"
                :error="alienPassportNumberError.text"
              />

              <field-select
                v-model="formData.alienPassportCountry"
                label="Страна выдачи"
                field-name="alien-passport-country"
                :items="citizenshipItems"
                placeholder="Выберите страну"
                with-search
                :error="alienPassportCountryError.text"
              />

              <field-select
                v-model="formData.alienPassportType"
                label="Тип паспорта"
                field-name="alien-passport-type"
                :items="passportItems"
                width="300px"
                placeholder="Выберите тип"
                :error="alienPassportTypeError.text"
              />
            </div>
          </template>
        </template>
      </fieldset-grid>

      <fieldset-grid legend="Меняли ли вы фамилию или имя?">
        <div class="form__row">
          <radio-group
            v-model="formData.dataChange"
            :options="dataChangeOptions"
            radioName="radio-data-change"
            :error="dataChangeError.text"
          />
        </div>

        <div v-if="hasDataChanged" class="form__row">
          <field-text
            v-model="formData.changedLastName"
            label="Фамилия"
            field-name="birthday"
            :error="changedLastNameError.text"
          />

          <field-text
            v-model="formData.changedFirstName"
            label="Имя"
            field-name="email"
            :error="changedFirstNameError.text"
          />
        </div>
      </fieldset-grid>

      <div class="form_actions">
        <button type="submit">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script>
import FieldsetGrid from "./Grids/FieldsetGrid.vue";
import FieldText from "./Fields/FieldText.vue";
import RadioGroup from "./Fields/RadioGroup.vue";
import FieldSelect from "./Fields/FieldSelect.vue";
import citizenships from "../assets/data/citizenships.json";
import passportTypes from "../assets/data/passport-types.json";
import errors from "../helpers/errors";

const GENDER_OPTION_MALE = "Мужской";
const GENDER_OPTION_FEMALE = "Женский";

const DATA_CHANGE_OPTION_NO = "Нет";
const DATA_CHANGE_OPTION_YES = "Да";

const RUSSIA_ID = 8604;

export default {
  components: { FieldsetGrid, FieldText, RadioGroup, FieldSelect },
  data() {
    return {
      genderOptions: [GENDER_OPTION_MALE, GENDER_OPTION_FEMALE],
      dataChangeOptions: [DATA_CHANGE_OPTION_NO, DATA_CHANGE_OPTION_YES],
      citizenshipItems: citizenships.map((c) => ({
        value: c.id,
        label: c.nationality,
      })),
      passportItems: passportTypes.map((c) => ({
        value: c.id,
        label: c.type,
      })),
      formData: {
        lastName: "",
        firstName: "",
        middleName: "",
        birthday: "",
        email: "",
        gender: "",
        citizenship: null,
        passportSeries: "",
        passportNumber: "",
        passportDate: "",
        alienLastName: "",
        alienFirstName: "",
        alienPassportNumber: "",
        alienPassportCountry: null,
        alienPassportType: null,
        dataChange: "",
        changedLastName: "",
        changedFirstName: "",
      },
      formDirty: false,
      errorsValidate: null,
    };
  },
  computed: {
    hasDataChanged() {
      return this.formData.dataChange === DATA_CHANGE_OPTION_YES;
    },
    selectedRussia() {
      return this.formData.citizenship?.value === RUSSIA_ID;
    },
    lastNameError() {
      return this.errorsValidate({ val: this.formData.lastName }, [
        "required",
        "cyrillic",
      ]);
    },
    firstNameError() {
      return this.errorsValidate({ val: this.formData.firstName }, [
        "required",
        "cyrillic",
      ]);
    },
    middleNameError() {
      return this.errorsValidate({ val: this.formData.middleName }, [
        "required",
        "cyrillic",
      ]);
    },
    errorBirthday() {
      return this.errorsValidate({ val: this.formData.birthday }, [
        "required",
        "date",
      ]);
    },
    emailError() {
      return this.errorsValidate({ val: this.formData.email }, [
        "required",
        "email",
      ]);
    },
    genderError() {
      return this.errorsValidate({ val: this.formData.gender }, ["required"]);
    },
    citizenshipError() {
      return this.errorsValidate({ val: this.formData.citizenship }, [
        "requiredSelect",
      ]);
    },
    passportSeriesError() {
      if (!this.selectedRussia) {
        return { error: false, text: "" };
      }

      return this.errorsValidate(
        { val: this.formData.passportSeries, len: 4 },
        ["required", "length"]
      );
    },
    passportNumberError() {
      if (!this.selectedRussia) {
        return { error: false, text: "" };
      }

      return this.errorsValidate(
        { val: this.formData.passportNumber, len: 6 },
        ["required", "length"]
      );
    },
    passportDateError() {
      if (!this.selectedRussia) {
        return { error: false, text: "" };
      }

      return this.errorsValidate({ val: this.formData.passportDate }, [
        "required",
        "date",
      ]);
    },
    alienLastNameError() {
      if (this.selectedRussia) {
        return { error: false, text: "" };
      }

      return this.errorsValidate({ val: this.formData.alienLastName }, [
        "required",
        "latin",
      ]);
    },
    alienFirstNameError() {
      if (this.selectedRussia) {
        return { error: false, text: "" };
      }

      return this.errorsValidate({ val: this.formData.alienFirstName }, [
        "required",
        "latin",
      ]);
    },
    alienPassportNumberError() {
      if (this.selectedRussia) {
        return { error: false, text: "" };
      }

      return this.errorsValidate({ val: this.formData.alienPassportNumber }, [
        "required",
      ]);
    },
    alienPassportCountryError() {
      if (this.selectedRussia) {
        return { error: false, text: "" };
      }

      return this.errorsValidate({ val: this.formData.alienPassportCountry }, [
        "requiredSelect",
      ]);
    },
    alienPassportTypeError() {
      if (this.selectedRussia) {
        return { error: false, text: "" };
      }

      return this.errorsValidate({ val: this.formData.alienPassportType }, [
        "requiredSelect",
      ]);
    },
    dataChangeError() {
      return this.errorsValidate({ val: this.formData.dataChange }, [
        "required",
      ]);
    },
    changedLastNameError() {
      if (!this.hasDataChanged) {
        return { error: false, text: "" };
      }

      return this.errorsValidate({ val: this.formData.changedLastName }, [
        "required",
        "cyrillic",
      ]);
    },
    changedFirstNameError() {
      if (!this.hasDataChanged) {
        return { error: false, text: "" };
      }

      return this.errorsValidate({ val: this.formData.changedFirstName }, [
        "required",
        "cyrillic",
      ]);
    },
  },
  created() {
    this.errorsValidate = errors.validate.bind(errors, this);
  },
  methods: {
    checkErrors() {
      for (const key in this.formData) {
        if (Object.hasOwnProperty.call(this.formData, key)) {
          const error = this[`${key}Error`]?.error;

          if (error) {
            return true;
          }
        }
      }

      return false;
    },
    formSubmit() {
      this.formDirty = true;

      if (!this.checkErrors()) {
        console.log(this.formData);
      }
    },
  },
};
</script>

<style scoped>
.form {
  width: 750px;
  max-width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0 auto;
  background-color: #ffffff;
}

.form__row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form__row:last-child {
  margin-bottom: 0;
}

.form_actions {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}

.form_actions button {
  border: none;
  padding: 0 25px;
  height: 40px;
  background-color: #245af6;
  color: #ffffff;
  border-radius: 3px;
}

.form_actions button:hover {
  opacity: 0.9;
  cursor: pointer;
}

@media screen and (max-width: 520px) {
  .form__row {
    flex-wrap: wrap;
  }
}
</style>
