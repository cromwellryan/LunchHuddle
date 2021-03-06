var Foo = {
  the_answer: 42,
  double_it: function(n) {
    return(n*2);
  },

  times_2: function(n) {
    return(this.double_it(n));
  }
};

function squared(n) {
  return(n * n);
};

describe("javascript", function() {

  describe("Crockford's beget", function() {
    var Klass = {
      who: "eddie",
      what: function() {
        if(this.who === 'eddie') {
          return('would go');
        }
        else if (this.who === 'kilroy') {
          return('was here');
        }
      }
    };

    it("beget news up a javascript object", function() {
      var k1 = Object.beget(Klass);  
      var k2 = Object.beget(Klass);
      k2.who = 'kilroy';

      expect(k1.what()).toEqual('would go');
      expect(k2.what()).toEqual('was here');
    });
  });

  describe("jquery", function() {
    it("get each key/value pair of a javascript var with '$.each(-var-, -func(k,v){...'", function() {
      var foo = {'one': 1, 'two': 22, 'three': 'three', 'four': 'fore!'};
      var expected_key_string = "onetwothreefour";
      var expected_val_string = "122threefore!";

      var actual_key_string = "";
      var actual_val_string = "";
      $.each(foo, function(k,v) {
        actual_key_string += k;
        actual_val_string += v;
      });

      expect(actual_key_string).toEqual(expected_key_string);
      expect(actual_val_string).toEqual(expected_val_string);
      
    });
  });

  describe("underscore", function() {
    it("select is underscores 'filter'", function() {
      var ctrl = [1,2,3,4,5,6];
      var actual = _.select(ctrl, function(n) {return (n % 2 === 0);});
      expect(actual).toEqual([2,4,6]);
    });

    it("select with an array of objects", function() {
      var the_list = [];
      var O1 = {};
      var O2 = {};
      var O3 = {};
      O1.foo = 11;
      O2.foo = 21;
      O3.foo = 31;

      the_list.push(O1);
      the_list.push(O2);
      the_list.push(O3);
      
      var foo = _.select(the_list, function(o) {return(o.foo > 20);});

      expect(foo.length).toEqual(2);
      expect(foo[0].foo).toEqual(21);
      expect(foo[1].foo).toEqual(31);
    });
  });


  it("convert a js object to an array", function() {
    var ctrl = {'man': 25, 'horse': 45, 'my_car': 90, 'nascar': 210, 'indy_car': 230};
    var actual_array = kv_pair_to_array(ctrl);
    var expected_array = [['man', 25],
                          ['horse', 45],
                          ['my_car', 90],
                          ['nascar', 210],
                          ['indy_car', 230]]
    expect(actual_array).toEqual(expected_array);
  });

  it("sort a js object by its value", function() {
    var ctrl = { 'horse': 45, 'man': 25,'my_car': 90, 'indy_car': 230, 'nascar': 210 };
    var an_array = kv_pair_to_array(ctrl);

    var foo = an_array.sort(function(a,b) { return(a[1] < b[1]); });
    expect(foo[0][0]).toEqual('indy_car');
  });

  describe("jasmine", function() {
    describe("spies", function() {
      // it("spies can intercept a function and call a different function", function() {
      //   spyOn(Foo, 'double_it').andCallFake(function(value) { return 314; });

      //   var r = Foo.double_it(12);
      //   expect(r).toEqual(314);
      //   expect(Foo.double_it).toHaveBeenCalledWith(12);
      // });

      // it("spies can intercept a nested function call", function() {
      //   spyOn(Foo, 'double_it').andCallFake(function(value) { return 314; });

      //   var r = Foo.times_2(12);
      //   expect(r).toEqual(314);
      //   expect(Foo.double_it).toHaveBeenCalledWith(12);
      // });

      it("spy on a stand-alone function", function() {
        var foo = squared(9);
        expect(foo).toEqual(81);

        squared = jasmine.createSpy().andCallFake(function(value) { return 314; });;
        foo = squared(3);
        expect(foo).toEqual(314);
      });
    });
  });

  // describe("localStorage", function() {
  //   it("can write an array to localStorage", function() {
  //     var foo = ['one', 'two', 'three', 'four'];
  //     localStorage.setItem('foo', foo);

  //     var get_it_back = localStorage.getItem('foo');
  //     expect(get_it_back.length).toEqual(4);
  //   });
  // });
});


function kv_pair_to_array(o) {
    var actual_array = [];
    $.each(o, function(key) { 
      actual_array.push([key, o[key]]);
    });

    return actual_array;
}

