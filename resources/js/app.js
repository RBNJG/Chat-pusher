/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

// const app = createApp({});

// import ExampleComponent from './components/ExampleComponent.vue';
// app.component('example-component', ExampleComponent);

// import ChatForm from './components/ChatForm.vue';
// app.component('chat-form', ChatForm);

// import ChatMessages from './components/ChatMessages.vue';
// app.component('chat-messages', ChatMessages);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */

// app.mount('#app');

import ExampleComponent from './components/ExampleComponent.vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatForm from './components/ChatForm.vue';
import Canvas from './components/Canvas.vue';


const app = createApp({
    data() {
        return {
            messages: [],
            newCanvas: {}
        };
    },
    created() {
        this.fetchMessages();
        window.Echo.private('chat')
            .listen('MessageSent', (e) => {
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                });
            });

        // routes/channels
        // Escuchamos el canal canvas para reconstruir el canvas cuando el que está dibujando hace mouseout    
        window.Echo.private('canvas')
            .listen('CanvasUpdate', (e) =>{
                this.newCanvas = e.canvas;
                console.log(this.newCanvas);
            });

    },
    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },
        addMessage(message) {
            this.messages.push(message);
            axios.post('/messages', message).then(response => {
                console.log(response.data);
            });
        },
        sendCanvas(canvas){
            axios.post('/canvas', canvas).then(response => {
                console.log(response.data);
            });
        }
    }
});

// Registra los componentes
app.component('example-component', ExampleComponent);
app.component('chat-messages', ChatMessages);
app.component('chat-form', ChatForm);
app.component('canvas-component', Canvas);

// Monta la aplicación Vue
app.mount('#app');