import './src/styles/style.scss'
import { PagesController } from "./src/components/pages/pagesController.js";
import { formController } from "./src/components/form/formController.js";
import { authController } from "./src/components/auth/authController.js";
import { categoryController } from "./src/components/category/categoryController.js";

PagesController.init()
formController.init()
authController.init()
categoryController.init()