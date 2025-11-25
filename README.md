# The CEM Site Repository

A Svelte based task managment appliaction 

Download Visual Studio Code from Here - https://code.visualstudio.com/ Or from The Windows Store

Download the NVM Node Version Manager from Here - https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe
go through setup just use default options for everything if it asks if you want to let it manage an already installed node version click yes after
installation a PowerShell window should open in there type nvm install latest and close once its done

Download GIT 
fastest way is to use winget open a powershell window as an administrator and run this command  
winget install --id Git.Git -e --source winget 
or download the exe from here https://git-scm.com/install/windows

Clone the GitHub repository you can view the repository here https://github.com/Dylan-D-999/Cem-Site#

upon opening visual studio code and going through the setup you will see a clone git repository option under the start heading
click that to open a small text box and paste this to clone the repository to your computer https://github.com/Dylan-D-999/Cem-Site.git
alternatively open a terminal and run git clone https://github.com/Dylan-D-999/Cem-Site.git in the file you want to store the repository I 
recommend just doing it through visual studio code

after cloning the repository there are some useful vs code extensions you should download these can be viewed on the left side bar and clicking the second to last icon for extensions here you should search svelte and download the second option on the list simply titles Svelte the second extension you will want is Vite it should be the first option that comes up when searching for vite the one with the purple and yellow logo not the green one  

a lot of these files you don't need to touch you will probably only need to mess with the files under src/routes there's a page.svelte file there which is the 
landing page of the site where you can start messing around and getting familiar with svelte 

to run the website if you've installed the vite plugin there should be a little yellow lightning bolt at the bottom of VS code click that and then press either open in embedded browser or open in system browser if that doesn't work. this will open up the local web page after this you don't need to rebuild the application you can simply make changes in the code and then save them by going file>save in the top bar of vs code after doing that simply refresh the page and you should see your changes.

As for making commits there are a few rules to keep in mind the first is using branches if you cloned the repository using vscode you can click the third button down on the left hand side called source control here you can see changes that you have made to the code one you have made some changes locally and you have 
tested it to make sure it all works you can then commit these changes up to the main repository you should be developing on a separate branch branches. its a 
bit hard to explain it all here but id recommend this video explaining it all much better than I can if you need more help with this let me know/
https://www.youtube.com/watch?v=vA5TTz6BXhY

I don't know everyone's level of experience using git or web development / using VS Code so for now I would recommend just cloning the repository and 
making some random changes here and there just to get comfortable with these tools in regards to git you could also make your own repository and start using that to get some experience with it you could start using it on your other assignments the event driven one and the data structures one as a practice
on your own personal accounts and so on.

