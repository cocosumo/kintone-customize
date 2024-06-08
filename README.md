# DEPRECATED

DON'T USE THIS FOR NEW KINTONE CUSTOMIZATIONS.
CREATE NEW REPOSITORY FOR EACH APP CUSTOMIZATION INSTEAD.

This is due to observed short life cycle of kintone customization that defeats the benefits of monorepo.
Continuing monorepo approach will lead to more weight from unused codes and dependencies, and more complex build process.



# kintone-customize

Yumetetsu
Kokosumo
Sutekura


## Contributing

- NodeJS 16^
- Install packages for root, and for each packages.
- When depency error appears while installing packages, follow instructions in the console. 
eg. 

```
npm i --legacy-peer-deps.
```

It can be formally resolved by updating related packages, but it is better to create a new repository.

- eslint rules has been updated, so it is natural that eslint errors will appear from unmaintained codes. 
Instead of fixing, it is recommended to create new repository for each app customization.


