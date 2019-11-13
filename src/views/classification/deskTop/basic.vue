<template>
  <div class="basic">
    <div class="left">
      <!-- 轮播图 -->
      <el-carousel :interval="4000" type="card" height="280px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.src" alt="">
        </el-carousel-item>
      </el-carousel>
      <!-- 标签页 -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple last"></div>
        </el-col>
      </el-row>
      <!-- 事件通知 -->
      <div class="event">
        <span>事件通知</span>
        <span class="line"></span>
      </div>
      <!-- 报警事项 -->
      <el-row>
        <el-col :span="8">
          <div class="one">
            <div class="matter">
              <el-badge :value="3" class="item">
                <span>报警事项</span>
              </el-badge>
            </div>

            <div class="info">
              <ul>
                <li>
                  <a href="#">1. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">2. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">3. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">4. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">5. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">6. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
              </ul>
            </div>
            <div class="more">
              <span>更多</span>
              <a href="#">>></a>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="one">
            <div class="matter">
              <el-badge :value="3" class="item">
                <span>报警事项</span>
              </el-badge>
            </div>

            <div class="info">
              <ul>
                <li>
                  <a href="#">1. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">2. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">3. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">4. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">5. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">6. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
              </ul>
            </div>
            <div class="more">
              <span>更多</span>
              <a href="#">>></a>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="one three">
            <div class="matter">
              <el-badge :value="3" class="item">
                <span>报警事项</span>
              </el-badge>
            </div>

            <div class="info">
              <ul>
                <li>
                  <a href="#">1. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">2. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">3. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">4. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">5. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
                <li>
                  <a href="#">6. 超速报警 沪DS8676-高清 超速 ....</a>
                </li>
              </ul>
            </div>
            <div class="more">
              <span>更多</span>
              <a href="#">>></a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="right">
      <div class="announcement">
        <div class="notice">通知公告</div>
        <div class="message">
          <p>放中秋啦</p>
          <p>xxxxxxxxxxxxx</p>
        </div>
      </div>
      <div class="weather">
        <div class="temperature">
          <i class="el-icon-cloudy-and-sunny"></i>31℃
        </div>
        <div class="area">上海 / 小到中雨 / 南风3-4级</div>
      </div>
      <div class="date">
        <!-- 日历 -->
        <el-calendar v-model="value"></el-calendar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
      imgList: [
        { id: '1', src: 'http://img4.imgtn.bdimg.com/it/u=2566275103,3880570939&fm=26&gp=0.jpg' },
        { id: '2', src: 'http://img2.imgtn.bdimg.com/it/u=3228955532,988027134&fm=26&gp=0.jpg' },
        { id: '3', src: 'http://img5.imgtn.bdimg.com/it/u=282288572,1740808269&fm=26&gp=0.jpg' },
        { id: '4', src: 'http://img4.imgtn.bdimg.com/it/u=1396945797,290909179&fm=26&gp=0.jpg' },
        { id: '5', src: 'http://img4.imgtn.bdimg.com/it/u=3118002611,4278803979&fm=26&gp=0.jpg' },
        { id: '6', src: 'http://img2.imgtn.bdimg.com/it/u=2477689059,1134890801&fm=26&gp=0.jpg' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
ul > li > a {
  color: #000;
  text-decoration: none;
}
ul > li {
  list-style: none;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
}
.basic {
  height: 100%;
  display: flex;
  padding: 20px;
       .left {
        flex: 3;
        height: 100%;
        margin-right: 30px;

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .grid-content {
    height: 100px;
    background-color: #fff;
    margin-right: 30px;
    // border-radius: 5px;
  }
  .last {
    margin: 0;
  }
  .event {
    height: 40px;
    line-height: 40px;
    display: flex;
    span {
      color: #000;
    }
    .line {
      display: block;
      flex: 1;
      height: 1px;
      background-color: #000;
      margin-top: 20px;
      margin-left: 12px;
    }
  }
  .one {
    height: 300px;
    background-color: #fff;
    margin-right: 30px;

    .matter {
      height: 40px;
      width: 100%;
      background-color: rgb(51, 51, 51);
      color: #fff;
      line-height: 40px;
      text-align: center;
    }
    .more {
      height: 40px;
      padding: 0 15px;
      margin-top: 45px;
      span {
        color: #333;
        float: left;
      }
      a {
        color: #333;
        float: right;
        text-decoration: none;
      }
    }
 }
  .three {
    margin: 0;
  }
  }
      .right {
      flex: 1;
      float:right;
        box-sizing: border-box;
        .announcement {
          height: 280px;
          background-color: #fff;
           margin-bottom: 29px;
           .notice {
             height: 40px;
             background-color: #333;
             color: #fff;
             line-height: 40px;
             text-align: center;
           }
           .message {
             height: 240px;
             padding: 20px;
               box-sizing: border-box;
              p:nth-child(1) {
                text-align: center;
                margin-bottom:20px;
              }
           }
        }
        .weather {
           height: 120px;
           background-color: #fff;
           margin-bottom: 20px;
           padding: 10px;
           box-sizing: border-box;
           .temperature {
            text-align: center;
            height: 40px;
            line-height: 40px;
            color: #333;
            font-size: 26px;
            font-weight: 700;
            i {
              font-size: 36px;
            }
           }
           .area {
             height: 40px;
             width: 240px;
             background-color: #333;
             margin: 0 auto;
             border-radius: 20px;
             color: #fff;
             line-height: 40px;
             text-align: center;
           }
        }
        .date {
          height: 250px;
           background-color: #fff;
           /deep/ .el-calendar {
             /deep/ .el-calendar__header {
               padding: 10px 20px;
             }
             /deep/ .el-calendar__body {
                /deep/ .el-calendar-table {
                /deep/ .el-calendar-table__row {
                 /deep/ .el-calendar-day {
                   height: 40px;
                   text-align: center;
                 }
                }
                }
             }
           }
        }
      }
}

</style>
