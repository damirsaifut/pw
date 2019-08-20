export class Constants {
  static emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

const LocalStorage = function(storage) {
  this.get = function() {
    return JSON.parse(localStorage.getItem(storage));
  };

  this.set = function(key) {
    localStorage.setItem(storage, JSON.stringify(key));
  };

  this.clear = function() {
    localStorage.removeItem(storage);
  };
};

const prefix = 'ls';

const ls = {
  token: new LocalStorage(`${prefix}:token`)
};

export { ls };
