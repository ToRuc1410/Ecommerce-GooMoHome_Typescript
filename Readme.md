Project Components and Libraries
Components

1. Layout: RegisterLayout for two elements { pages: Login , Register] }
2. Popop: A component that appears when hovering over multi-language, account, cart

## Libraries

1. Framer Motion: Animation library for React web
2. React Popper or Floating Ui: Libraries to calculate position for tooltips, PopHov, Scroll up and down, etc.

## Other Features

1. AppContext: A folder created to store the isAuthenticate variable to check if the User is logged in or not from localstorage. The value of localstorage is taken from the auth.ts file.
2. Star Rating Algorithm
3. Pagination Mechanism
4. URL Handling for SEO
5. Caching Mechanism: Handles API calls for queries between two different times: staleTime: 3601000 is used in ProductList and ProductDetail
6. Lazyload Component: With react lazy and react router
7. Rollup Plugin Visualizer: Used to analyze the files, folders, etc. that occupy a percentage in the project

## Issues and Solutions

1. Form Submission Error: In the login and register forms, there is a common axios error ~ 4xx-5xx
2. Router Element Division: useRouterElement divides router element
3. SortProductList Handling: The default active will be the latest (createdAt). Note: There is a problem with sorting by price (sortPrice) if the user chooses ['popular', 'latest', 'best selling'] then it needs to be run according to a flow that is:

- Most popular -> not popular
- Latest -> not latest
- Best selling -> not selling

4. XSS Prevention: Using the DOMPurify library, a DOM-only, super-fast, XSS sanitizer for HTML, MathML, and SVG. This prevents users from hacking the web using js. This part is used for product.description.
5. Logout Issue: When logging out, the cart of the API purchase should be disabled, not allowing it to call the API anymore because when calling back the cart, it does not know which user object it is because there is no token causing an error. The solution is to check at the useQuery function in the header to call purchase, we check whether the user has logged in or logged out. If they have logged in or registered, then only enable the API purchase.

## Learning Notes

Chapter 24: SEO for developers
