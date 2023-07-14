# Quiz-App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# Routes Configuration
The routes constant defines the routing configuration for the application. It consists of two routes:

- The route with the path "result" is associated with the AnswersComponent component. It also includes a resolver QuizService.getLatestResults() that fetches the latest results for the component.
- The default route (path "**") is associated with the QuizMakerComponent.
# TrackByUtils
The TrackByUtils class provides utility methods used for trackBy functionality in Angular templates. It includes the following methods:

-  id(_index: number, item: any): string: Returns the unique identifier of an item.
-  index(index: number): number: Returns the index of an item.

# TextHighLightPipe
The TextHighLightPipe is a custom Angular pipe used for highlighting search terms in a given text. It utilizes the DomSanitizer to ensure the safe rendering of HTML.

The pipe has the following signature:
```
transform(text: string, searchValue: string): SafeHtml
```

-  text: The input text to be transformed.
-  searchValue: The search term to be highlighted in the text.

# FilterByPipe
The FilterByPipe is a custom Angular pipe used for filtering an array of items based on a search term. It performs a case-insensitive search and filters the array based on the specified key.

The pipe has the following signature:
```
transform(inputString: string | null, items: any[] = [], key: string = "name"): any[]
```

-  inputString: The search term to filter the items.
-  items: The array of items to be filtered.
-  key: The property of each item to be used for filtering (default is "name").
# CustomValueAccessor

The CustomValueAccessor abstract class is a base class for implementing custom value accessors in Angular. It provides common functionality for implementing ControlValueAccessor interface.

The class includes the following features:

-  **value property**: Gets or sets the value associated with the custom control.
-  **disabled property**: Indicates whether the custom control is disabled.
-  **changes array**: Holds an array of functions to be called when the value of the control changes.
- **touches array**: Holds an array of functions to be called when the control is touched.
-  **control property**: Represents the associated Angular AbstractControl.
-  **transformGetValue property**: A function that transforms the value before emitting it in the changes array.
- **transformSetValue property**: A function that transforms the incoming value before assigning it to the value property.

**The CustomValueAccessor** class is meant to be extended by custom value accessor implementations. It provides the necessary methods and properties required for two-way data binding and interacting with Angular forms.


# QuizMakerComponent
The **QuizMakerComponent** is an Angular component that represents the quiz maker functionality of the application. It allows the user to select a category, subcategory, and difficulty level, and generate a quiz based on those selections.

The component includes the following properties:

- **categories$**: An observable that emits an array of SubCategory objects representing the available categories.
- **questions$**: An observable that emits an array of Question objects.
The component includes the following methods:

- **ngOnInit()**: void: Initializes the component and subscribes to the valueChanges of the category form control.
- **generateQuiz()**: void: Generates a quiz based on the selected category, subcategory, and difficulty level. It makes a request to the QuizService to create the quiz.
switchQuestion(question: Question): void: Switches a specific question in the quiz with a new question retrieved from the API.
- **ngOnDestroy()**: void: Unsubscribes from the destroy$ subject to prevent memory leaks.
manageSubcategory(): void: Manages the visibility and validation of the subcategory control based on the selected category hierarchy.
- **initializeQuizForm()**: FormGroup: Initializes the quiz form with the necessary form controls.
- **setSelectedCategoryHierarchy(categoryId: number)**: void: Sets the selected category hierarchy based on the provided category ID.
- **showInvalidFormError()**: void: Displays an error toast message when the quiz form is invalid.

The **QuizMakerComponent** template includes a form that allows the user to select a category, subcategory, and difficulty level for the quiz. The form includes a button to generate the quiz. The generated quiz is displayed using the app-quiz component if there are questions available.

# AutoFilterDropDownComponent
The **AutoFilterDropDownComponent** is an Angular component that represents an auto-filtering drop-down input. It provides a searchable drop-down list of options and allows the user to select an option.

## Component Properties
- **dataOptions (required)**: An array of SubCategory or Category objects representing the available options for the drop-down.
- **placeholderText**: A string that defines the placeholder text for the input field (default: "Select").
- **optionValue**: A string that specifies the property name of the option object to be used as the value (default: "id").
- **optionLabel**: A string that specifies the property name of the option object to be used as the label (default: "name").
## Component State
- **searchControl**: A FormControl instance used to capture the user's input in the search field.
- **displayResults**: A boolean flag indicating whether to display the drop-down list of options.
## Lifecycle Hook
- **ngOnInit()**: Initializes the component and subscribes to the valueChanges of the searchControl to toggle the visibility of the drop-down list based on the user's input.
Methods
- **onInputFocus()**: Triggered when the input field receives focus. Sets the displayResults flag to true to display the drop-down list.
selectOption(value: any): Sets the selected option value to the component's value property, updates the input field's value with the option's label, and hides the drop-down list.
Template

This provides an overview of the AutoFilterDropDownComponent and its associated template. The component allows users to search and select options from a drop-down list.