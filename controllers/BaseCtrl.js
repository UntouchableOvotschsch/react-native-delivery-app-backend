class BaseCtrl {
    constructor(model){
        
        this.model = model

        this.getById = this.getById.bind(this)
        this.deleteById = this.deleteById.bind(this)
        this.getAll = this.getAll.bind(this)
    }
    getById(req, res) {
        this.model.findById(req.params.id, (err, data) => {
            if(err) {
                return res.status(400).json({ message: 'Error get', err})
            }
    
            res.json(data)
        })
    }
    deleteById(req, res) {

        let reqId = req.params.id
    
        this.model.findByIdAndRemove(reqId, (err, data) => {
            if(err) {
                return res.status(400).json({ message: 'Error delete', err})
            }
    
            res.json({
                message: 'Was deleted'
            })
        })
    }
    getAll(req, res) {
        this.model.find({},(err, data) => {
            if(err){
                return res.status(400).json({ message: 'Error get All', err})
            }
    
            res.json(data)
        })
    } 
}

module.exports = BaseCtrl