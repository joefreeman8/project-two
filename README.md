# SOFTWARE ENGINEERING IMMERSIVE - PROJECT TWO #

A hackathon style project done in pairs within 48hours.

### Collaborator ###
[Aromi Afolabi](https://github.com/aromiafolabi "Aromi Afolabi") 

## Final-Space ##
This was a 48hour hackathon challenge in which we worked in pairs to build a React app which used a public API. 
Aromi and I chose to create a Final Space index, consisting of the characters and a list which would open a new window to watch the selected episode. 

## Brief ##
* Consume a public API.
* Have several components.
* The app can have a router - with several "pages", this is up to your discretion and if it makes sense for your project.
* Be deployed online and accessible to the public.

## Built With ##
* React.js
* JSX
* CSS
* Bulma
* Axios
* React-Notify-Toast
* React-Router-Dom
* GitHub

## Deployment ##
The app is deployed on Netlify and can be found [**here**](https://finalspacelistings.netlify.app/ "here"). 

## Process ##
Knowing we only had 48 hours in order to complete this project we chose an API which we thought would be fun to work with and we were able to clearly set out our “must haves”. My teammate and I decided we would code along together and for a small quick project like this it worked really well.
Must haves featured: 
* App to have multiple components 
* Navbar 
* Search functionality 

Our stretch goals consisted of: 
* Filter functionality 
* Adding in toast notifications 
* Create link to watch episodes
* Create a game page

We began coding the frame of the site by creating the basic components and BrowserRouter. Here is an example of the BrowserRouter:

```js 
   <BrowserRouter>
     <Notification />
     <Nav />
     <Switch>
       <Route exact path="/">
         <Home />
       </Route>
       <Route path="/character/:characterId">
         <CharacterShow />
       </Route>
       <Route path="/character">
         <CharacterIndex />
       </Route>
       <Route path="/episode">
         <EpisodeIndex />
       </Route>
     </Switch>
   </BrowserRouter>
```

## Homepage ##
The homepage is a simple landing page with a twinkling background with a title and nav bar positioned at the top.
![homepage](/src/assets/homepage.png)

## Character Index ##
Once landing at the Character Index page an async function will run. This code block has been sectioned with a try/catch statement and will await the promise from axios, then set the data in state. This then allows us to cherry pick or manipulate the data which we draw from the API.

```js
 React.useEffect(() => {
   const getData = async () => {
     try {
       const res = await getAllCharacters()
       setCharacters(res.data)
     } catch (err) {
       setIsError(true)
     }
   }
   getData()
 }, [])
```

We were then able to use the data drawn from this API to create Character Cards which are displayed on this index page.

![characterindex](/src/assets/characterindex.png)

## Search Function ##
One of the must have features for us on this project was to have a search function, so the user is able to type and find the exact character they want. We did so by filtering through each character name and ensuring it matches the search value which the user types.
```js
 const filterCharacters = (characters) => {
   return characters.filter(character => {
     return character.name.toLowerCase().includes(searchValue.toLowerCase())
   })
 }
 ```
 ![searchfunction](/src/assets/searchfunction.gif)

 ## Character Show ##
The Character Show page is accessed by clicking one of the Character Cards on the Character Index page. This page is made by increasing the size of the character card and adding more information about the selected character. We found that some characters had many different special abilities and aliases, as such we decided to use Math.random to randomly provide a new result from the data each time the card is opened or page is re-rendered.

 ![showpage](/src/assets/showpage.gif)

 We also took the opportunity to request more information from the API site as we included ‘quotes’ from the characters. 
The API site stored Characters, Quotes and Episodes in separate arrays. As such we had to pull the data together in our try statement and then used an if statement to instruct what to do if there is a match. 
We found this a great opportunity to have some fun with the page & to have the quote appear in a toast notification. Again, due to the many number of quotes some characters have a different quote will be generated at random each time.
```js
 React.useEffect(() => {
   const getData = async () => {
     try {
       const characterRes = await getSingleCharacter(characterId)
       setCharacter(characterRes.data)
       const quoteRes = await getAllQuotes()
       const quotesArray = quoteRes.data.filter(quote => {
         if (quote.by === characterRes.data.name) {
           return quote
         }
       })
       createNotification(quotesArray[Math.floor(Math.random() * quotesArray.length)].quote)
     } catch (err) {
       setIsError(true)
     }
   }
   getData()
 }, [characterId])
 ```

 ## Toast Notification ##
 We created an export function which enabled us to create the notifications for the toast popups.

 ```js 
import { notify } from 'react-notify-toast'
 
export function createNotification(message) {
 notify.show(message, 'custom', 3000, { background: '#fbcb46', color: '#000' })
}
```

## Episode Index ##
The Episode index is made the same way as our Character Index, however here we opted for a filter option instead of a search bar. This enables the user to choose which season they would like to view.

 ![episodefilter](/src/assets/episodefilter.gif)

We added a filteredEpisodes function and added a drop down list in the JSX.
```js
 const handleSelect = (e) => {
   setSelectedSeason(e.target.value)
 }
 
 const filteredEpisodes = (episodes) => {
   return episodes.filter(episode => {
     return episode.air_date.includes(selectedSeason) || selectedSeason === 'all'
   })
 }
 ```
 ```js
 <select onChange={handleSelect}>
   <option value="all">All Seasons</option>
   <option value="2018">Season One</option>
   <option value="2019">Season Two</option>
 </select>
```

 ## Linking To Netflix ##
 Finally we managed to achieve our final stretch goal which was to make the images of our Episode Index into anchor tags which then opened a new window for the user to be able to watch the chosen episode. This was another fun feature to build in and took some thinking of how we can achieve it. 
First we created a file in our lib folder, and made an export function containing all the URLS of the Netflix episodes. Each episode is named as a number, this enables us to match the episode name with the episodeID from the API.

```js
export const episode = {
 '1': 'https://www.netflix.com/watch/80174386?trackId=200257859',
 '2': 'https://www.netflix.com/watch/81001394?trackId=13752289',
 '3': 'https://www.netflix.com/watch/81001395?trackId=200257858',
 '4': 'https://www.netflix.com/watch/81001396?trackId=200257858',
 '5': 'https://www.netflix.com/watch/81001397?trackId=200257858',
 '6': 'https://www.netflix.com/watch/81001398?trackId=200257858',
 '7': 'https://www.netflix.com/watch/81001399?trackId=200257858',
 '8': 'https://www.netflix.com/watch/81001400?trackId=200257858',
 '9': 'https://www.netflix.com/watch/81001401?trackId=200257858',
 '10': 'https://www.netflix.com/watch/81001402?trackId=200257858',
 '11': 'https://www.netflix.com/watch/81106565?trackId=200257858',
 '12': 'https://www.netflix.com/watch/81106566?trackId=200257858',
 '13': 'https://www.netflix.com/watch/81106567?trackId=200257858',
 '14': 'https://www.netflix.com/watch/81106568?trackId=200257858',
 '15': 'https://www.netflix.com/watch/81106569?trackId=200257858',
 '16': 'https://www.netflix.com/watch/81106570?trackId=200257858',
 '17': 'https://www.netflix.com/watch/81106571?trackId=200257858',
 '18': 'https://www.netflix.com/watch/81106572?trackId=200257858',
 '19': 'https://www.netflix.com/watch/81106573?trackId=200257858',
 '20': 'https://www.netflix.com/watch/81106574?trackId=200257858',
 '21': 'https://www.netflix.com/watch/81106575?trackId=200257858',
 '22': 'https://www.netflix.com/watch/81106576?trackId=200257858',
 '23': 'https://www.netflix.com/watch/81106577?trackId=200257858',
}
```
```js
<a href={episode[episodeId]} target="_blank" rel="noreferrer"><img src={image} alt={name} /></a>
```
Utilising target=”_blank” so the user does not lose their place on our site. 

 ![netflix](/src/assets/netflix.gif)

## Loading.js & Error.js ##
Two files were also made, Loading.js comes into play whenever the page is loading and taking a while to show the content.

<p>...loading<span> 🚀🍪</span></p>

```js  
function Loading() {
 return <p>...loading<span>🚀🍪</span></p>
}
 
export default Loading
```

And we also have one for error handling too, this is just in case there are any issues when trying to retrieve the data from the API. 
  <h2 className="title">
    Oh no, something went wrong <span>👽</span>
  </h2>

```js
function Error() {
 return (
   <div className="container has-text-centered">
     <h2 className="title">
       Oh no, something went wrong <span>👽</span>
     </h2>
   </div>
 )
}
 
export default Error
```

Both the error and loading components are set in state. This makes it impossible for the user to see more than one state at any one time.
```js
 <div className="columns is-multiline">
   {isError && <Error />}
   {isLoading && <Loading />}
   {characters &&
     filterCharacters(characters).map(character => (
       <CharacterCard ...
```

## Challenges ##
* One of the biggest challenges we faced on this hackathon was with filtering the episodes. The difficulty stemmed from the data provided in the API and how we could pick a part of it which would be unique for our filtering, i.e. the year of release, rather than the full date. We managed to get around this by setting the selected season in state and checking if it includes the same value. 
* Another challenge arose when we were trying to work out how to retrieve all the quotes but then only display one quote at a time, randomised, on a toast notification. A bit of trial and error and a sprinkling of Google helped us navigate our way to success on this one.

## Bugs ##
* The only known bug at this stage is located within the character show page. We found out moments before the hackathon deadline that our error handler would kick up an error on this page if the character did not have any quotes to retrieve from the API. This problem only occurs on the characters which play lesser roles in Final Space which I assume do not have many lines in the show! Due to this being discovered moments before the deadline we opted to turn the error handler off on this page. 

## Future Improvements ##
* Bug fixes.
* Work a little more on the CSS, jazz things up some more.
* Create another page for a game, to add engagement, something like a pair game where you have to match the tiles could have been a nice addition.

## Wins & Key Learnings ##
* The project was invaluable in terms of working as a pair and learning how other people approach code.
* The improvement in understanding setting data ‘in state’ and navigating APIs.
* Recognising that console.log() is your best friend.
