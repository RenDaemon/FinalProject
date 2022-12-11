<template>
<nav class="bg-indigo-700 border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a class="flex items-center">
      <img src="../assets/XcN_RAVEN-removebg-preview.png" class="h-6 mr-3 sm:h-9" />
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-gray-200">XcN.Ravenツ</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button"
      class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default" aria-expanded="false">
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"></path>
      </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-indigo-700 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-indigo-700 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
              <a class="flex-col">

  <span class="block text-sm text-gray-200 dark:text-white"  id="username_display">Hi : {{ App.email }}</span>

</a>
        </li>
        <li>
        <button id="sign_out"
          class="block px-4 py-2 text-sm text-gray-900 hover:bg-indigo-300 dark:hover:bg-gray-600 dark:text-gray-900 dark:hover:text-white bg-indigo-200 rounded-md"
          @click="App.logout()">Sign out</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

  <div>
    <h1 class="flex justify-center text-3xl font-bold my-24 mt-5">XcN.Site</h1>
    <form>
      
        <div class="flex justify-center">
            <input type="url" id="website"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-lg"
              placeholder="Type your long URL in here" required v-model="App.submit.rlinks.oldrlinks">
        </div>
        <div class="flex justify-center mt-5">
          <span
            class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            xcn.site:5173/
          </span>
          <input type="text" id="website-admin"
            class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-xs "
            placeholder="Type your custom URL in here"
            v-model="App.submit.rlinks.newrlinks">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-6 "
            @click="App.Shorten(App.submit.rlinks)"> Shorten </button>
        </div>
        
    </form>


  </div>

  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-200 dark:text-gray-400 mt-20">
      <thead class="text-xs text-gray-200 uppercase bg-indigo-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="py-3 px-6">
            Your URL
          </th>
          <th scope="col" class="py-3 px-6">
            Click Count
          </th>
          <th @click= "col" class="py-3 px-6">
            Edit
          </th>
          <th scope="col" class="py-3 px-6">
            Delete
          </th>

        </tr>
      </thead>
     
      <tbody v-for="link in App.rlinks"
      :key ="link.id">
        <tr class="bg-indigo-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-400 dark:hover:bg-gray-600">
          <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <a target="_blank"  v-bind:href="'http://'+link.newrlinks">{{ link.newrlinks }}</a>
          </th>
          <td class="py-4 px-6">
            <p class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{link.click}} </p>
          </td>
          <td class="py-4 px-6">
            <!-- edit -->
            <button
            v-if="!link.editpages" @click="link.editPages = !editPages"
              class="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-900 transition-colors duration-150 bg-indigo-300 rounded-full focus:shadow-outline hover:bg-indigo-500">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                </path>
              </svg>
            </button>
            <div v-if="link.editPages" class="text-gray-900">
              <label for="">Custom Link</label>
              <p>xcn.site:5173/ &nbsp;</p>
              <input v-model="App.submit.rlinks.Updatenewrlinks">
              <div>
                <button @click="App.edit(link.id, link.newrlinks)" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-xs px-2.5 py-1.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-4 mr-3">
                  Edit
                </button>
                <button @click="link.editPages = !link.editPages" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs px-2.5 py-1.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ml-3">Cancel</button>
              </div>
            </div>
          </td>
          <!-- Delete -->
          <td class="py-4 px-6">
            <button
            @click="App.linkdelete(link.id)"
              class="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-lg focus:shadow-outline hover:bg-pink-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>

    </table>
  </div>


</template>
<script>
  import {useApp} from '../stores/index';

  export default {
    setup() {
      const App = useApp();
      return {
        App,
      }
    },
    mounted() {
      this.App.renderLink();
    },
    beforeMount() {
      this.App.checkUid();
    }
}
</script>
