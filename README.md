# Reinforcing your blocks: A practical guide to UI component testing

## Outline

- [Introduction](#introduction)
- [Introduction to UI component testing](#introduction-to-ui-component-testing)
- [Reasons to test UI components](#reasons-to-test-ui-components)
- [Difficulty of different automated tests](#difficulty-of-different-automated-tests)
- [Testing tools](#testing-tools)
- [How to test UI components](#how-to-test-ui-components)
- [Advanced topics](#advanced-topics)
- [Conclusion](#conclusion)
- [Resources](#resources)

## Introduction

> How it all started and what the audience should learn

Hello, my name is Diego Hernandez. I am a front-end dev in the IBM Security design team. I've been interested in software testing for quite some time. I knew it was important to test my code, but I didn't know where or how to start. I always viewed it as a thing that took a lot of time and was better to work on later "when I had more time". Surprise surprise! We never just have "more time" later. So I decided that the best time to start testing my work was now.

Great! I have a resolution to start testing my code…first I need to learn how. So I ventured in to the web, especially YouTube, but most of what I found were tutorials with overly simplistic and not realistic examples. How many ways can you test and re-test a function that just adds two numbers together, right? I found a lot of these resources impractical and not translatable to my work of building user interfaces. 

Luckily, I've worked with some incredible developers in IBM and have had time to explore this topic and I've picked up a few tricks and guidelines for UI component testing that I am going to share with you.

## Introduction to UI component testing

> The different aspects of UI testing

_SHOW TESTING PYRAMID and explain we're only going to focus on unit tests_

The industry standard way of building user interfaces for complex applications like ones we build here at IBM is to break down our UIs into small and reusable components. Javascript UI components in most cases (like React) can be seen as a function or API that takes some inputs and results in structured HTML with styles and behaviors ready to be used. Our job is to make sure that this output is both correct, repeatable, and predictable. There are different aspects of our components that we need to concern ourselves with:

**Code quality:** Are there bugs in the code that will prevent from the component from outputting anything at all (Does it render)? 

**Structural:** Is component outputting the expected HTML, given different arguments/props?

**Behavioral:** Is the user able to interact with this component and trigger the expected action without any side-effects?

**Visual:** Is the component styled according to the design-specs? Do all of the variations in this component adhere to the designs?

**Semantics and Accessibility:** Is a user with a visual, cognitive, mobility impairment able to get the same value out of your component as users without any impairment? These tests cases are all structural, behavioral, and visual

**Performance:** Does the component require the least about of your users' resources to achieve their purpose?

The main mentality to have is "what can I possibly do to this  component to break it?". _what doesn't kill you makes you stronger… the same goes for your UI!_



## Reasons to test UI components

> Reasons why someone should start testing their code

All of the things characteristics of UI components I mentioned before can all be tested manually. Just spin up your application and play with it. However, we're developers and we like automating things. So instead of doing the same manual tests over and over again, we can just automate most of it!

But why would you would you want to spend the time automating tests?

- Well, first it will  make you a better programmer. With the idea that unit tests are very small in scope and are intended to test a single component, we're forced to make our code easy to test by focusing on modularity and not relying on side effects for things to work
- You'll be able find bugs much sooner. This important because the cost of finding bugs in later stages of a project can be exponentially more costly. Also none of us want a user to find a critical, yet preventable bug before we do 🙀. You can share this idea with your execs if you're struggling to get buy-in for why it's worth your time and the business' money to automate tests.
- Lastly because our craft and we're paid to build good and solid software so it is our responsibility to make sure our code works well under any circumstance and that's what automated testing can help us with.  



## Difficulty of different automated tests

> Not all automated tests are created equal



Some UI characteristics are harder than others to test automatically, but it is possible to achieve an acceptable testing strategy. Today, I'm going to focus on what has worked for us in IBM Security thus far.

**Diagram:**

```
|Easier                                 |Hard                             Harder|
|---------------------------------------|---------------------------------------|
^Structural                             ^Behavioral   ^Accessibility      Visual^
^Code quality
```



## Testing tools

> Discuss what tools we need to start

For running automated tests, we use a few types of tools:

**Test runner:** It is the tool that you call to run your tests and report on the results. They handle finding all test files in your repo, finding all of the tests, running them, and aggregating results data. Popular ones are `jest` and `mocha`. I'm going to use `jest` for the demo later.

**Assertion library:** Instead of doing something like `expectedValue === actualValue` we have more sophisticated ways of asserting that our test results match some expected result. That's what assertion libraries do and they integrate with test runners. A popular assertion library is `chai`. `jest` also comes with an assertion API so we're just going to use that in the demo.

**DOM environment:** We're working with actual HTML, CSS, and Javascript here so we need to have a the functionality and APIs available to us in a browser. A popular DOM environment is `jsdom`. `jest` already comes with this environment so we don't need to anything else to set this up.

**UI component renderer:** Lastly, for our automated tests, we need to have a way to "render" the components we are testing into this DOM environment. The choice of tool will vary depending on what framework you're using. For React popular tools are `react-testing-library` and `enzyme`. For Vue a popular tool is… and for Angular a popular tool is… For this demo, I'm going to use `react-testing-library` as it is quickly surpassing `enzyme` because it encourages better testing practices.

**Component development environment:** This is separate from automated UI test, but will be very important in testing the harder characteristics of your components. It provides a way to render functioning components in isolation in different states. The most popular tool for this is called `storybook`. It has different setups for different frameworks, but it works with all of the popular ones!



## How to test UI components

Now into the meat of this talk. I'll show you how to use these tools to actually test UI components! I won't show you how to set these tools up, it's boring and not the most valuable use of our time here. So assuming that the are all set up:

### Code quality

1. The lowest hanging fruit when it comes to making sure that your components will at least render is to declare and document their props. This means that any properties that a component will receive has a data type checking mechanism to ensure that the data is receives is what is expected.

   

   Angular developers, you're all set with Typescript on this. And both React and Vue have a way of doing so.

   

2. Add a code linter to your project. Linters are tools let you set coding standard rules like not having unused variables or using array methods instead of for-loops and checks your code against these rules. We use `eslint`. It can be extended to check for specific React rules for example. We even have a rule that forces us to declare all property types in our components.  You can integrate it into your continuous integration tools so PRs with linting errors cannot be merged, and your code editor so it tells your while you're typing of any errors.

Both of these will test the quality of your code.

### Structural

Asserting HTML outputs

1. First let's make sure it renders and it doesn't throw any errors. It is the bare minimum requirement.

   ```jsx
   test('should render', () => {
     expect(() => shallow(<MyComponent />)).not.toThrow()
   })
   ```

2. We can expand this test to check for different attributes. A recommended approach to writing good tests is to only have one assertion per test. If you have more than one assertion in a test, it can be difficult to pin point the source of the failure.

   ```jsx
   test('should have the expected classes', () => {
     const wrapper = shallow(<MyComponent />)
     const button = wrapper.find('button')
     expect(button.prop('className')).toBe('my-class')
   })
   
   test('should have the correct label', () => {
     const wrapper = shallow(<MyComponent />)
     const button = wrapper.find('button')
     expect(button.prop('label')).toBe('Click me')
   })
   ```

3. You can see how this can get out of hand and rather verbose. `jest` has this concept of snapshots which can be really helpful in these situations. It generates a expected output based on the first time the test is run assuming that the output is correct it serves that the truth. This generated output is called a snapshot and they're very short to write.

   ```jsx
   test('should render', () => {
     const wrapper = shallow(<MyComponent />)
     expect(wrapper).toMatchSnapshot()
   })
   ```

   The first time this test is run, a snapshot that looks like this is generated into a `.snap` file and any time this test is run again it will compare the actual output to this generate snapshot. This means that you would also push the `.snap` files to version control.

   ```html
   <SNAPSHOT!/>
   ```

   If at any point you change the output of the component, the snapshot test will fail even it it is a minor change. This is good because there is a lot to keep track of in HTML elements. If you do intend to change the structure of your output, you're able to update the snapshot with a single command and now you have a new truth.

   

   A word of caution about snapshots is that they are easy to generate and update, but which means you should always always and I mean always confirm that any snapshot updates are intentional. As a developer and a code reviewer this is really crucial. Otherwise if you just update snapshots without reviewing them, you're losing out on the entire benefit of testing.

   

4. One of the main guidelines for what to test in UI components is conditional renders or conditional elements within your output based on a different prop. For example this component has a variation that we can test

   ```jsx
   <div>
     {renderThing && <div>I have a thing</div>}
   </div>
   ```

   Taking all that we have discussed so far, we can test the structure of this variation like this:

   ```jsx
   test('should variation', () => {
     const wrapper = shallow(<MyComponent renderThing />)
     expect(wrapper).toMatchSnapshot()
   })
   ```

   

### Behavioral

Now that we know our component and its variations render correctly. We can test how the component behaves:

1. Testing user interactions can be achieved by simulating use actions on the component and asserting that this action had an effect on the HTML. For example, we have an accordion element that the user can click and expand.

   ```jsx
   test('expand when user clicks on button', () => {
     const wrapper = shallow(<Accordion />)
     const button = wrapper.find('button')
     button.simulate('click')
     expect(wrapper).toMatchSnapshot()
   })
   ```

   By simulating a click on the button, the component output should now be different because the content is expanded.

   

2. What about action that cause some callback function to run, like a form submit. We can test those with mock functions. A mock is a piece of code that fakes a behavior and sometimes records some stats on how the mock is used in the test. `jest` provides a mock function that can be used for this type of test.

   ```jsx
   test('submitting the form invokes `onSubmit`', () => {
     const mockSubmit = jest.fn()
     const wrapper = shallow(<Form onSubmit={mockSubmit} />)
     const submitButton = wrapper.find('button[type="submit"]')
     submitButton.simulate('click')
     expect(mockSubmit).toHaveBeenCalled()
   })
   ```

   Notice that we don't generate a snapshot in this test. That is because we're testing callback function behavior and not a structural change. Here we just assert that the mock submit was called at least once after the submit button was clicked. `jest` has other mock function related assertions like how many times your function was called, what arguments were used in the function call, etc.

3. There are some instances where we can't control or replace a function to check that it was called. For example, adding or removing an event listener to the `window` object. For this we use what is called a spy. A spy is a way to listen in on function calls without actually mocking its implementation. Spies are sneaky and very useful. Let's look at an example of when a spy would be useful in a real scenario. Suppose you have a component that adds a resize event listener to the `window` object when the component is first created and when the component is no longer needed and discarded, the event listener is removed. It's very important that components clean up after themselves. 

   ```jsx
   test('removes window resize listener', () => {
     const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
     const rearrangeHandler = () => {}
     const wrapper = shallow(<MyComponent onRearrange={rearrangeHandler} />)
     wrapper.unmount()
     expect(removeEventListenerSpy).toHaveBeenCalledWith(rearrangeHandler)
   })
   ```

   Not only are we testing that the event listener is removed when the component is unmounted, but also that it removed the specific handler we provided.



### Visual

1. There are ways to add visual regression testing to your project. Visual regression testing is similar to snapshots, but with actual rendered images of your components. Setting up these types of tests is challenging and the tests are fragile because minor variability in pixel rendering. Instead, we rely on manual tests but we try to make this easy by using Storybook. With storybook you can render components in isolation in different variations. It also helps with collaboration with designers.


   ```jsx
   const stories = storiesOf('MyComponent', module)
   
   stories.add('Default', () => (<MyComponent onChange={action('onChange')} />))
   
   stories.add('With x variation', () => (
     <MyComponent variation="x" onChange={action('onChange')} />
   ))
   ```

   

### Accessibility

1. Accessibility automated testing is easy to set up and the tests are not fragile. The difficulty comes from assessing if the tests are giving good guidance. I'll show you what I mean...

2. For A11y testing we rely on two different add-ons to the existing tools we have set up. There is an `eslint` plugin called `eslint-plugin-jsx-a11y` that warns us of known accessibility anti-patterns.

   

3. Additionally, we use the color-blindness and a11y addons for Storybook. Errors in here won't necessarily prevent you from merging changes, but developers and reviewers should also be looking at these tools.

   

4. Lastly, there is an IBM accessibility checker that focuses on the accessible and semantic HTML structures. For this tool, you need to get an API key and use the node package through Artifactory, it is called `@ibma/aat`. I'll be sure to share a link to this in the resources.

### Performance

I owe you all more info on this. To be honest, I have not gotten around to learn enough about this topic to be able to speak about it.

## Advanced topics

Lastly, there are some advanced topics that I won't have time to cover in-depth but I think are useful enough to mention.

* Travis CI integration for linting and testing
* Automatic pull request branch Storybook deployment
* Storyshots - use Storybook stories for your unit tests
* Adding visual regression tests to Storybook'

## Conclusion

There is a lot that I covered in this talk. And it might seem overwhelming, but I think it's better to have a good understanding of the why and how of UI component testing that you can take back and hopefully learn more and eventually implementing in your projects. Just to recap, here are the key takeaways:

- There are several characteristics of UI components that can and should be tested: Structure, behavior, styles, accessibility, and performance
- Unfortunately not all characteristics can be tested the same way, but you can device a testing strategy that works for you and your team with the tools I've shared
- When defining what to test, focus on various props, conditional outputs, and user behaviors
- Snapshot tests are your friends, but 👀 use with caution 

## Resources

- [Jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)
- [React-testing-library](https://testing-library.com/react)
- [Eslint](https://eslint.org/)
  - Airbnb
  - Carbon
  - React
  - JSX
  - A11y
  - Security

