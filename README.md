# DEPRECATED

DON'T USE THIS FOR NEW KINTONE CUSTOMIZATIONS.
CREATE NEW REPOSITORY FOR EACH APP CUSTOMIZATION INSTEAD.

# kintone-customize

Yumetetsu
Kokosumo
Sutekura


## Contributing

Some customizations here are deprecated. 
Please create new repository for each app customization instead.

- NodeJS 16^
- Install packages for root, and for each packages.
- When depency error appears while installing packages, follow instructions in the console. 
eg. 

```
npm i --legacy-peer-deps.
```

- eslint rules has been updated, so it is natural that eslint errors will appear from unmaintained codes. 
Instead of fixing, it is recommended to create new repository for each app customization.

It can be resolved by updating related packages, but creating a new repository is more recommended.
This is due to observed short life cycle of kintone customization that defeats the benefits of monorepo.