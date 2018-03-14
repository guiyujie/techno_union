import ActionTypes from 'ActionTypes'

const types = ActionTypes.COMMON;

//操作成功
export const optSuccess = (msg) => {
    return {
      type: types.get('OPTSTATUS'),
      optStatus: 'success',
      msg
    }
}

//操作失败
export const optError = (msg) => {
    return {
      type: types.get('OPTSTATUS'),
      optStatus: 'error',
      msg:msg
    }
}

//提交中
export const optLoading = (msg) => {
    return {
        type: types.get('OPTSTATUS'),
        optStatus: 'loading',
        msg:msg
    }
}

export const hideToast = () => {
    return {
        type: types.get('HIDETOAST')
    }
}


