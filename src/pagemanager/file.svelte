<script>
    export let id = "";
	export let name = "";
    export let path = "";
	export let indent = 0;
    export let select;
    export let selectAndClose;
</script>

<style>
    button {
        appearance: none;
        background: inherit;
        border: inherit;
        color: inherit;
        font: inherit;
        cursor: pointer;
        padding-left: 2rem;
        margin-left: -2rem;
    }

    li {
        position: relative;
        padding-left: 15px;
    }

    li span {
        text-decoration: none;
    }

    li span:before {
        display: block;
        content: ' ';
        width: 10px;
        height: 1px;
        position: absolute;
        border-bottom: 1px dotted #aaa;
        top: 0.6em;
        left: -14px;
    }
    li:before {
        list-style-type: none;
        font-family: FontAwesome;
        display: block;
        content: "F";
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        font-size: 1.3em;
        color: #d278c9;
        pointer-events: none;
    }
</style>

<li data-level={indent}>
    <button on:click={select(id)} on:dblclick={selectAndClose(id)}>
        <span title={name} class="folder-name">{path}</span>
    </button>
</li>