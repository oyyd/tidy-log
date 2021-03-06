describe('core',function(){
  describe('config',function(){    
    it('options.showTimeLabel should be true by default',function(){
      expect(tidyLog.options.showTimeLabel).toEqual(true);
    });
    it('options.showTimeLabel should be false',function(){
      tidyLog.config({
        showTimeLabel:false
      });
      expect(tidyLog.options.showTimeLabel).toEqual(false);
    });
  });
  describe('options',function(){
    describe('showTimeLabel',function(){
      it('should log with time label',function(){
        tidyLog.config({
          showTimeLabel:true
        });        
        spyOn(console,'log');

        var logger = tidyLog.create();

        var log = logger.log('test');

        expect(console.log).toHaveBeenCalledWith('['+log.getFormatedTime()+']','test');
      });
      it('should log without time label',function(){
        tidyLog.config({
          showTimeLabel:false
        });        
        spyOn(console,'log');

        var logger = tidyLog.create();
        var log = logger.log('test');

        expect(console.log).toHaveBeenCalledWith('test');
      });
    });

    describe('display',function(){
      it('should have called console.log',function(){
        tidyLog.config({
          display:true
        });
        spyOn(console,'log');

        var logger = tidyLog.create();
        logger.log('test');

        expect(console.log.calls.count()).toEqual(1);
      });

      it('should have not called console.log',function(){
        tidyLog.config({
          display:false
        });
        spyOn(console,'log');

        var logger = tidyLog.create();
        logger.log('test');

        expect(console.log.calls.count()).toEqual(0);
      })
    });    

    describe('showPath',function(){
      it('should have path info',function(){
        tidyLog.config({
          display:true,
          showTimeLabel:false,
          showPath:true
        });

        spyOn(console,'log');

        var logger = tidyLog.create();
        var log = logger.group('xhr').log('test');

        expect(console.log).toHaveBeenCalledWith(
          '('+logger.group('xhr').fullPath()+')',
          'test'
        );
      });
    });
  });
});