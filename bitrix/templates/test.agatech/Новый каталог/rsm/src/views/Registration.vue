<template>
	<div class="reg">
		<img 
		class="reg-bg" 
		:class="activeBlur ? 'blur' : ''"
		src="../assets/images/cedric-frixon-QiJp6dWw1oE-unsplash.jpg" 
		alt="">
		<div class="reg-wrap">
			<vm-stepper 
				v-model="step" 
				previous-text="Назад" 
				save-next-text="Далее"
				save-text="Сохранить"
				:show-footer="false">
				<vm-stepper-header>
					<vm-stepper-step step="1" :complete="step > 1">
						Регистрационные данные
					</vm-stepper-step>
					<vm-divider/>
					<vm-stepper-step step="2" :complete="step > 2">
						Адрес проживания
					</vm-stepper-step>
					<vm-divider/>
					<vm-stepper-step step="3">
						Место учебы
					</vm-stepper-step>
				</vm-stepper-header>
				<vm-stepper-items>
					<vm-stepper-content step="1">
						<vm-row vm-justify="center">
							<vm-col type="flex" vm-justify="center" vm-align="center" vm-w="12">
								<vm-card>
									<div slot="header">
										<h3>Регистрационные данные</h3>
									</div>
									<div>
										<span>Заполните свои личные данные.</span>
									</div>
									<div>
										<vm-col type="flex" vm-justify="flex-start">
											<br>
											<vm-row 
											v-for="(item, index) in citizenship" 
											:key="index">
												<br><br>
												<input type="radio" :id="item.name" :value="item.value" v-model="user.citizenship">
												<label :for="item.name">&nbsp;{{item.value}}</label>
												<br><br>
											</vm-row>
											<br>
										</vm-col>
										<vm-row vm-w="12">
											<vm-input label="Имя" placeholder="" v-model="user.name"/>
											<vm-input label="Фамилия" placeholder="" v-model="user.surname"/>
											<vm-input label="Отчество" placeholder="" v-model="user.patronymic"/>
										</vm-row>
										<vm-row type="flex" vm-justify="flex-start" vm-w="12">
											<div class="reg-sex">
												<span class="vm-input--label m10">Ваш пол</span>
												<vm-row class="m10">
													<div
													v-for="(item, index) in sex" 
													:key="index"
													class="m5">
														<input type="radio" :id="item.name" :value="item.value" v-model="user.sex">
														<label :for="item.name">&nbsp;{{item.value}}</label>
													</div>
												</vm-row>
											</div>
											<div>
												<vm-col class="reg-date">
													<span class="vm-input--label m10">Дата рождения</span>
													<br>
													<date-picker 
														v-model="user.dob" 
														format="DD.MM.YYYY" 
														valueType="format" 
														lang="ru"
														class="date"></date-picker>
												</vm-col>
											</div>
											<div>
												<vm-input label="Телефон" placeholder="" v-model="user.tel"/>
											</div>
										</vm-row>
										<vm-row vm-w="12">
											<vm-input label="Электронная почта" placeholder="" v-model="user.mail"/>
											<vm-input label="Вконтакте" placeholder="" v-model="user.vk"/>
											<vm-input label="Facebook" placeholder="" v-model="user.fb"/>
										</vm-row>
										<vm-row type="flex" vm-justify="flex-start" vm-align="center" vm-w="12">
											<vm-button 
												class="m10" 
												color="primary" 
												type="filled" 
												@click="activePrompt = !activePrompt"
												:disabled="user.image != null ? true : false"
												:title="user.image != null ? 'Загрузить аватарку' : 'Аватарка загружена'">Загрузить аватарку</vm-button>

											<vm-chip v-if="user.image != null">
												<vm-avatar :src="user.image != null ? user.image : 'https://randomuser.me/api/portraits/men/4.jpg'"/>
												{{user.name}} {{user.surname}}
											</vm-chip>
											<vm-prompt
												vm-title="Авторизация"
												vm-accept-text="Сохранить"
												vm-cancel-text="Закрыть"
												:vm-active.sync="activePrompt"
												class="cropperDialog">
												<div class="con-exemple-prompt">
													Загрузить <b>фотографию</b>.
													<CropperImage @clipData="clipData"/>
												</div>
											</vm-prompt>
										</vm-row>
										<vm-row vm-w="12">
											<vm-input type="password" label="Пароль" placeholder="" v-model="user.password"/>
											<vm-input type="password" label="Подтверждение пароля" placeholder="" v-model="user.confirmPassword"/>
										</vm-row>
										<div>
											<vm-row class="m5">
												<vm-checkbox v-model="user.checkBox1">Я согласен с правилами пользователя</vm-checkbox>
											</vm-row>
											<vm-row class="m5">
												<vm-checkbox v-model="user.checkBox2">Я согласен с обработкой персональных данных</vm-checkbox>
											</vm-row>
										</div>
									</div>
								</vm-card>
							</vm-col>
						</vm-row>
					</vm-stepper-content>
					<vm-stepper-content step="2">
						<vm-row vm-justify="center">
							<vm-col type="flex" vm-justify="center" vm-align="center" vm-w="12">
								<vm-card>
									<div slot="header">
										<h3>Адрес проживания</h3>
									</div>
									<div>
										<span>Заполните свои личные данные.</span>
									</div>
								</vm-card>
							</vm-col>
						</vm-row>
					</vm-stepper-content>
					<vm-stepper-content step="3">
						<vm-row vm-justify="center">
							<vm-col type="flex" vm-justify="center" vm-align="center" vm-w="12">
								<vm-card>
									<div slot="header">
										<h3>Место учебы</h3>
									</div>
									<div>
										<span>Заполните свои личные данные.</span>
									</div>
								</vm-card>
							</vm-col>
						</vm-row>
					</vm-stepper-content>
				</vm-stepper-items>
				<div class="vm-stepper-footer">
					<vm-row vm-justify="flex-end" vm-w="12">
						<vm-button 
							color="dark" 
							class="m5" 
							type="filled"
							@click="step >= 2 ? step-- : step">Назад</vm-button>

						<transition name="taskList">
							<vm-button 
								color="primary" 
								class="m5" 
								type="filled" 
								v-if="step <= 2"
								@click="step <= 2 ? step++ : step">
									Далее
							</vm-button>
						</transition>
						<transition name="taskList">
							<vm-button 
								color="primary" 
								class="m5" 
								type="filled" 
								v-if="step >= 3"
								@click="step <= 2 ? step++ : step">
								Сохранить
							</vm-button>
						</transition>
					</vm-row>
				</div>
			</vm-stepper>
			<vm-row type="flex" vm-justify="center">
				
			</vm-row>
		</div>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import CropperImage from '@/components/CropperImage.vue'

export default {

	name: 'Registration',

	data() {
		return {
			activeBlur: false,
			activePrompt: false,
			step: 1,
			citizenship: [
				{value: 'Я - Гражданин РФ', name: 'rf'},
				{value: 'Я - Гражданин РФ, проживающий за рубежом', name: 'nrf'},
				{value: 'Я - иностранный гражданин, проживающий за рубежом', name: 'pe'},
				{value: 'Я - иностранный гражданин, Проживающий на территории РФ', name: 'perf'}
			],
			sex: [
				{value: 'Мужской', name: 'male'},
				{value: 'Женский', name: 'female'}
			],
			user: {
				citizenship: 'Я - Гражданин РФ', // гражданство
				name: '', // имя
				surname: '', // фамилия
				patronymic: '', // отчество
				sex: 'Мужской', // пол
				dob: '01.01.2001', // дата рождения,
				mail: '', // почта
				tel: '', // телефон
				vk: '', // вконтакте
				fb: '', // facebook
				image: null,
				password: '',
				confirmPassword: '',
				checkBox1: null,
				checkBox2: null
			}
		};
	},
	methods: {
		clipData(data){
			this.user.image = data
		}
	},
	mounted() {
		setTimeout(() => {
			this.activeBlur = true
		}, 500)
	},
	components: {
		DatePicker,
		CropperImage
	}
};
</script>

<style lang="css" scoped>
	.reg-wrap{
		max-width: 830px;
		margin: 0 auto;
	}
	.reg-date{
		width: 100%;
	}
	.card {
		background: #bdbdbd;
		padding: 10px 20px;
	}

	.vm-input{
		margin: 10px;
	}
	.vm-stepper, .vm-stepper__items{
		overflow: visible !important;
	}
</style>
