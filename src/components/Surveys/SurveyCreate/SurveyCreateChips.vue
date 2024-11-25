<template>
  <div class="mt-5 d-flex align-center">
    <v-chip-group
      column
      class="py-0"
      variant="outlined"
    >
      <v-slide-x-transition group>
        <v-chip
          v-for="(chip, key) in questions"
          :key="key"
          :text="chip.title"
          :ripple="false"
          size="large"
          class="my-0"
          @click="openDialog(chip, key)"
        />
      </v-slide-x-transition>
    </v-chip-group>
    <v-btn
      id="activator-target"
      variant="outlined"
      :ripple="false"
      text="Добавить вопрос"
      append-icon="plus_circle"
      rounded="xl"
      @click="openDialog()"
    />
  </div>

  <v-dialog
    v-model="dialog"
    max-width="713"
  >
    <template #default>
      <v-card class="px-5">
        <v-card-title class="card-title-text"> {{ dialogTitle }} </v-card-title>
        <v-card-text
          class="rounded-lg"
          style="background-color: #eceff4"
        >
          <v-text-field
            v-model="questionData.title"
            class="card-text"
            label="Текст вопроса"
            variant="outlined"
            required
            autofocus
          />

          <div class="px-5">
            <span class="text-medium-emphasis">Выберите тип</span>
            <div class="mt-2">
              <v-radio-group
                v-model="questionData.type"
                hide-details
                inline
                density="comfortable"
              >
                <v-radio
                  v-for="type in questionTypes"
                  :key="type"
                  class="mr-5"
                  :label="SurveyQuestionType.getValue(type)"
                  :value="type"
                />
              </v-radio-group>

              <div
                v-if="questionData.type !== SurveyQuestionType.Enum.TEXT"
                class="mt-2"
              >
                <span class="text-medium-emphasis">Варианты ответов</span>
                <div class="choices-container">
                  <v-text-field
                    v-for="(choice, key) in questionData.choices"
                    :key="key"
                    v-model="choice.title"
                    variant="outlined"
                    hide-details
                    :label="`Вариант ответа ${key + 1}`"
                    bg-color="white"
                    density="compact"
                    max-width="208"
                    min-width="130"
                    append-inner-icon="close"
                    @click:append-inner="deleteChoice(key)"
                  />

                  <v-btn
                    elevation="0"
                    bg-color="white"
                    density="compact"
                    icon="plus"
                    @click="addChoice"
                  />
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="my-5 pa-0">
          <v-btn
            :ripple="false"
            :elevation="0"
            variant="flat"
            text="Закрыть"
            color="#ECEFF4"
            @click="closeDialog"
          />
          <v-btn
            :ripple="false"
            :elevation="0"
            variant="flat"
            class="ml-6"
            :text="isEditMode ? 'Изменить' : 'Добавить'"
            color="#5E81AC"
            :disabled="!isFormValid"
            @click="saveQuestion"
          />
          <v-spacer />
          <v-btn
            v-if="isEditMode"
            :ripple="false"
            :elevation="0"
            variant="flat"
            class="ml-6"
            text="Удалить"
            color="#5E81AC"
            @click="deleteQuestion(editingIndex!)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { SurveyQuestionType, type QuestionTemplate } from '@/api/survey/survey.types'

const questions = defineModel<QuestionTemplate[]>('questions', {
  required: true
})

const dialog = ref(false)
const dialogTitle = ref('Добавление вопроса')
const questionData = reactive<QuestionTemplate>({
  title: '',
  type: SurveyQuestionType.Enum.TEXT,
  choices: []
})
const questionTypes = ref(SurveyQuestionType.values())
const isEditMode = ref(false)
const editingIndex = ref<number | null>(null)

// Добавление нового варианта ответа
const addChoice = () => {
  questionData.choices.push({
    id: '',
    title: ''
  })
}

// Сброс формы
const resetForm = () => {
  questionData.title = ''
  questionData.type = SurveyQuestionType.Enum.TEXT
  questionData.choices = []
}

// Закрытие диалога
const closeDialog = () => {
  dialog.value = false
  resetForm()
}
// Удаление варианта ответа
const deleteChoice = (index: number) => {
  if (index > -1) {
    questionData.choices.splice(index, 1)
  }
}

// Удаление вопроса по индексу
const deleteQuestion = (index: number) => {
  questions.value.splice(index, 1)
  closeDialog()
}

// Проверка валидности формы
const isFormValid = computed(() => {
  const hasChoices =
    questionData.type !== SurveyQuestionType.Enum.TEXT && questionData.choices.length > 0
  const isTitleValid = questionData.title.trim().length > 0
  return isTitleValid && (questionData.type === SurveyQuestionType.Enum.TEXT || hasChoices)
})

// Открытие диалога для добавления/редактирования
const openDialog = (question: QuestionTemplate | null = null, index: number | null = null) => {
  if (question) {
    dialogTitle.value = 'Редактирование вопроса'
    Object.assign(questionData, question)
    isEditMode.value = true
    editingIndex.value = index
  } else {
    dialogTitle.value = 'Добавление вопроса'
    resetForm()
    isEditMode.value = false
    editingIndex.value = null
  }
  dialog.value = true
}

// Сохранение или редактирование вопроса
const saveQuestion = () => {
  const question = { ...questionData }
  if (!isFormValid.value) return
  if (isEditMode.value && editingIndex.value !== null) {
    questions.value.splice(editingIndex.value, 1, question)
  } else {
    questions.value.push(question)
  }
  closeDialog()
}

// Обнуление вариантов при смене типа на "TEXT"
watch(
  () => questionData.type,
  nextType => {
    if (nextType === SurveyQuestionType.Enum.TEXT) {
      questionData.choices.length = 0
    }
  }
)
</script>

<style scoped>
.card-title-text {
  padding-left: 0 !important;
  padding: 20px 0 18px 0 !important;
  font-size: 20px !important;
  font-weight: 700 !important;
}
.card-text {
  padding-left: 22px !important;
  padding-right: 22px !important;
}
.choices-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 100%;
}
</style>
