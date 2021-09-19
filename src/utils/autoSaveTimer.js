class autoSaveTimer {
    constructor() {
        this.timeoutId = null;
      } 
     
      /**
       * 
       * @param {*} callback functions that describes functionality of save
       * @param {*} setIsSaving function sets saving to true of false
       */
      save(callback, setIsSaving) {
        setIsSaving(true);
        if (this.timeoutId) {
          clearTimeout(this.timeoutId)
        };
        this.timeoutId = setTimeout( ()  => {
          callback();
          setIsSaving(false);
        }, 2000);
      }
}

export default autoSaveTimer;
