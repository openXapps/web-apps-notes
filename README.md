# OpenApps - Quick Notes

Quick Notes is a [PWA](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app) pet project, that allows you to take notes and save them to your local machine. You can export your current note list or import a backup note list. Notes are converted to base64 when saved to your local machine. Functionality highlights:
* Save notes to your local machine.
* Export and import notes.
* Copy the active note with one button.
* Clear the note text area with one button.
* Toolbox menu to convert active note to upper or lower case. Trim option to remove excess white space.
* Quick save button.
* Staus bar
  * Switch wrap On or Off.
  * Switch spell check On or Off.
  * Zoom text area In and Out.
  * Text area character count.
  * Current font size.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Get Node JS setup and configured. See [this link](https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm) for guidance.
* Additional reading material at [this link](https://www.tutorialspoint.com/reactjs/reactjs_quick_guide.htm) for getting started with React.

### Installing

* Clone the project to your local machine.
* In the project folder, run
```
npm start
```
* Follow [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) for more information.

## Built With

* [Bootstrap](https://getbootstrap.com/) - Layout and decoration
* [React](https://reactjs.org/) - Web framework
* [NPM](https://www.npmjs.com/) - Dependency management

## Authors

* **OpenApps Founder** - *Initial work* - [GitHub](https://github.com/openXapps/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## ToDo List

* On the Open page (route)
  * Add a back button near top area.
  * Add note name search ability.
  * Reorder note list by showing last 5 opened notes first.
* In Toolbox menu
  * Rename Download Notes to Export Notes.
  * Add new Export Current Note option.
    * This will open the export page with the current note JSON text.
    * Now you can either copy the JSON or click new Share Note button.
    * Share Note should allow for a couple of messaging app options.
* Add emoji picker to insert an emoji at cursor position.
