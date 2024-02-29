<!-- resources/views/chat.blade.php -->
@extends('layouts.app')
@section('content')
<div class="container d-flex flex-row">
    <div class="col-9">
        <div>
            <canvas-component v-on:canvasupdate="sendCanvas"></canvas-component>
        </div>
    </div>
    <div class="col-3 card">
        <div class="card-header">Chats</div>
        <div class="card-body chat">
            <chat-messages :messages="messages"></chat-messages>
        </div>
        <div class="card-footer">
            <chat-form v-on:messagesent="addMessage" :user="{{ Auth::user() }}"></chat-form>
        </div>
    </div>
</div>
@endsection

<style scoped>

.chat{
    max-height: 520px;
}

</style>